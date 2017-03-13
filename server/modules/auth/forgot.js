import express from 'express'
import User from 'mongoose'
import nodemailer from 'nodemailer'
import async from 'async'
import config from '../../../config/project.config'

const router = new express.Router()
User.model('User')

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
        if (err) throw new Error('Erro na busca', err)
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
      const smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        // host: 'smtp.gmail.com',
        // port: 465,
        secureConnection: false,
        auth: {
          user: config.email,
          pass: config.email_pass
        }
      })

      smtpTransport.sendMail(mailOptions(user, req, token), function (err) {
        done(err, 'done')
      })
    }
  ],
  (err) => {
    if (err) {
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
    })
  })
})

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
    errors }
}

function mailOptions (user, req, token) {
  return {
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
}

module.exports = router

