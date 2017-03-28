import express from 'express'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import config from '../../../config/project.config'
import promisify from 'tiny-promisify'
import { emailFormValidate } from './utils'

const User = require('mongoose').model('User')
const randomBytes = promisify(crypto.randomBytes)
const router = new express.Router()

router.post('/', (req, res, next) => {
  const validationResult = validateForgotForm(req.body)
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  // Self Envoke
  (async () => {
    try {
      const buf = await randomBytes(20)
      const token = buf.toString('hex')

      const user = await User.findOne({ email: req.body.email })

      if (!user) throw new Error('Nenhuma conta encontrada com este email')

      user.resetPasswordToken = token
      user.resetPasswordExpires = Date.now() + 3600000 // 1 hour

      await user.save()

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
        if (err) throw new Error('Erro na busca', err)
        return res.status(200).json({
          success: true,
          message: 'Foi enviado o procedimento ao seu endereço de email, dê uma olhadinha.',
          data: {
            email: user.email
          }
        })
      })
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'O email informado não consta em nossa base.'
      })
    }
  // END Self Envoke
  })()
})

/**
 * Validate the logout form
 *
 * @param {object} payload the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateForgotForm (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  isFormValid = emailFormValidate(payload, errors, isFormValid)

  if (!isFormValid) {
    message = 'Há algo errado.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

function mailOptions (user, req, token) {
  return {
    from: config.email,
    to: user.email,
    subject: 'Melhore.me - Resete sua senha',
    text: `
      Você recebeu este email, porque você (ou alguém) solicitou que a senha de sua conta seja resetada.

      Para completar o processo, por favor clique no seguinte link, ou cole em seu browser:

      https://${req.headers.host}/reset/${token}

      Caso você não tenha feito esta solicitação, por favor ignore este email. Assim, sua senha permanecerá inalterada.
    `
  }
}

// export default router
module.exports = router
