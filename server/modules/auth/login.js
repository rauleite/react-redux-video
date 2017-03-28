import express from 'express'
import passport from 'passport'
import { emailFormValidate, passwordFormValidate } from './utils'

const router = new express.Router()

router.post('/', (req, res, next) => {
  doLogin(req, res, next)
})

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

  isFormValid = emailFormValidate(payload, errors, isFormValid)
  isFormValid = passwordFormValidate(payload, errors, isFormValid)

  if (!isFormValid) {
    message = 'Ops, Ocorreu algum errinho.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

export function doLogin (req, res, next) {
  console.log('doLogin', req.body)
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
}

export default router
// module.exports = router
