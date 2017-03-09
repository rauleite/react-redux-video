const async = require('async')
const nodemailer = require('nodemailer')
const express = require('express')
const validator = require('validator')
const passport = require('passport')
const crypto = require('crypto')
const User = require('mongoose').model('User')
const config = require('../../../config/project.config')
const router = new express.Router()

/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateSignupForm (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false
    errors.email = 'Forneça um email válido, por favor.'
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false
    errors.password = 'A senha deve ter pelo menos 8 caracteres.'
  }

  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false
    errors.name = 'Por favor, forneça o seu nome.'
  }

  if (!isFormValid) {
    message = 'Ops, ocorreu algum equívoco.'
  }

  return {
    success: isFormValid,
    message,
  errors}
}

/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateLoginForm (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false
    errors.email = 'Digite o seu email, por favor.'
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false
    errors.password = 'Digite a sua senha, please.'
  }

  if (!isFormValid) {
    message = 'Ops, Ocorreu algum errinho.'
  }

  return {
    success: isFormValid,
    message,
  errors}
}

/**
 * Validate the logout form
 *
 * @param {object} payload the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateLogoutForm (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false
    errors.email = 'Digite o seu email, por favor.'
  }

  if (!isFormValid) {
    message = 'Há algo errado.'
  }

  return {
    success: isFormValid,
    message,
  errors}
}

router.post('/signup', (req, res, next) => {
  const validationResult = validateSignupForm(req.body)
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  return passport.authenticate('local-signup', (err) => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        // the 11000 Mongo code is for a duplication email error
        // the 409 HTTP status code is for conflict error
        return res.status(409).json({
          success: false,
          message: 'Check the form for errors.',
          errors: {
            email: 'This email is already taken.'
          }
        })
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'You have successfully signed up! Now you should be able to log in.'
    })
  })(req, res, next)
})

router.post('/login', (req, res, next) => {
  const validationResult = validateLoginForm(req.body)
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message
        })
      }

      return res.status(400).json({
        success: false,
        message: 'Não foi possível processar o formulário.'
      })
    }

    return res.json({
      success: true,
      message: 'Você efetuou o login, com sucesso!',
      token,
      user: userData
    })
  })(req, res, next)
})

router.post('/forgot', (req, res, next) => {
  const validationResult = validateLogoutForm(req.body)
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }
  async.waterfall([
    (done) => {
      crypto.randomBytes(20, function (err, buf) {
        var token = buf.toString('hex')
        done(err, token)
      })
    },

   (token, done) => {
      User.findOne({ email: req.body.email }, function (err, user) {
        if (!user) {
          req.flash('error', 'Nenhuma conta encontrada com este email')
          return res.redirect('/forgot')
        }

        user.resetPasswordToken = token
        user.resetPasswordExpires = Date.now() + 3600000 // 1 hour

        user.save(function (err) {
          done(err, token, user)
        })
      })
    },

    (token, user, done) => {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        // host: 'smtp.gmail.com',
        // port: 465, 
        secureConnection: false,
        auth: {
          user: config.email,
          pass: config.email_pass
        }
      })
      
      var mailOptions = {
        from: config.email,
        to: user.email,
        subject: 'Melhore.me - Resete sua senha',
        text: `
          Você recebeu este email, porque você (ou alguém) solicitou que a senha de sua conta seja resetada.

          Para completar o processo, por favor clique no seguinte link, ou cole em seu browser:

          http://${req.headers.host}/reset/${token}

          Caso você não tenha feito esta solicitação, por favor ignore este email. Assim, sua senha permanecerá inalterada.
        `
      }

      smtpTransport.sendMail(mailOptions, function (err) {
        done(err, 'done')
      })
      
    }
  ], 
  (err) => {
    if (err)  {
      console.err('err', err.stack)
      return next(err)
    }
    // res.status(200).json({
    //   success: true,
    //   message: 'Email com procedimentos enviado com sucesso.',
    // })  
    res.render('index', {
      content: require('../../../src/routes/Form/Forgot'),
      context: 'Email com procedimentos enviado com sucesso.'
    }); 
  })
})

router.get('/reset/:token', (req, res) => {
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() }
  },
  (err, user) => {
    if (err) {
      console.err('err', err.stack)
    }

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'O Token para reset da senha é inválido ou expirou.'
      })
    }

    res.render('reset', {
      user: req.user
    })
  })
})

module.exports = router
