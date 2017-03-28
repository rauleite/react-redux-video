import express from 'express'
// import validator from 'validator'
import passport from 'passport'
import {
  emailFormValidate,
  passwordFormValidate
} from './utils'

const router = new express.Router()

router.post('/', (req, res, next) => {
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
          message: 'Ocorreu algum erro.',
          errors: {
            email: 'Este email já existe, você pode se logar usando-o.'
          }
        })
      }

      return res.status(400).json({
        success: false,
        message: 'Erro interno ao tentar processar o cadastro.'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Seu cadastro foi realizado com sucesso, agora pode fazer o login.'
    })
  })(req, res, next)
})

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

  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false
    errors.name = 'Por favor, forneça o seu nome.'
  }

  isFormValid = emailFormValidate(payload, errors, isFormValid)

  isFormValid = passwordFormValidate(payload, errors, isFormValid)

  if (!isFormValid) {
    message = 'Ops, ocorreu algum equívoco.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

// export default router
module.exports = router
