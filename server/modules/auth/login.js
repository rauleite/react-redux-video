import express from 'express'
import passport from 'passport'
import request from 'request-promise'
import redisClient from '../../../bin/redis-connect'

import { emailFormValidate, passwordFormValidate } from './utils'
import projectConfig from '../../../config/project.config'

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

export async function doLogin (req, res, next) {
  console.log('doLogin', req.body)
  try {
    let hasCaptcha = await redisClient.hmgetAsync(req.body.email, 'hasCaptcha')
    /* retorno vem null ou string representando true ou false */
    hasCaptcha = hasCaptcha[0]
    console.log('hasCaptcha - antes', hasCaptcha)
    console.log('typeof hasCaptcha', typeof hasCaptcha)
    hasCaptcha = hasCaptcha === 'true'
    console.log('hasCaptcha - depois', hasCaptcha)
    console.log('hasCaptcha typeof', typeof hasCaptcha, hasCaptcha)

    /* Se nao ha captcha retorna null, quando ha retorna string do boolean */
    if (hasCaptcha) {
      console.log('ha captcha no redis')

      /* Se ha captcha mas browser nao preencheu */
      if (!req.body.captchaValue) {
        console.log('NAO foi preenchido pelo browser')

        return resultSend(req, res, '400', {
          success: false,
          message: 'O captcha precisa ser preenchido',
          errors: {
            captcha: 'O captcha precisa ser preenchido'
          }
        })
      }
      console.log('FOI preenchido pelo browser')

      /* Se ha captcha e browser preencheu-o */
      const secretKey = projectConfig.captcha_secret
      let remoteIP = req.connection.remoteAddress.split(':')
      remoteIP = remoteIP[remoteIP.length - 1]

      let verificationUrl = 'https://www.google.com/recaptcha/api/siteverify?secret=' + secretKey +
        '&response=' + req.body.captchaValue +
        '&remoteip=' + remoteIP

      let responseCaptcha = await request(verificationUrl)

      responseCaptcha = JSON.parse(responseCaptcha)
      console.log('responseCaptcha', responseCaptcha)

      if (!responseCaptcha.success) {
        return resultSend(req, res, '400', {
          success: false,
          message: 'Erro na verificação do captcha',
          errors: {
            captcha: 'Erro na verificação do captcha'
          }
        })
      }
    }
  } catch (error) {
    console.log('error', error)
  }

  const validationResult = validateLoginForm(req.body)
  if (!validationResult.success) {
    return resultSend(req, res, '400', {
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return resultSend(req, res, '400', {
          success: false,
          message: err.message
        })
      }

      return resultSend(req, res, '400', {
        success: false,
        message: 'Não foi possível processar o formulário.'
      })
    }

    return resultSend(req, res, '200', {
      success: true,
      message: 'Você efetuou o login, com sucesso!',
      token,
      user: userData
    })
  })(req, res, next)
}

async function resultSend (req, res, status, respObj) {
  try {
    respObj.hasCaptchaComponent = false

    const objCaptcha = {
      email: req.body.email,
      count: 0,
      countExpires: Date.now() + 3600000,
      hasCaptcha: false
    }

    let replyCountExpires = await redisClient.hmgetAsync(req.body.email, 'countExpires')

    replyCountExpires = Number(replyCountExpires)

    console.log('replyCountExpires', replyCountExpires)

    /* Se nao existe, cria novo */
    if (replyCountExpires === 0) {
      const isOk = await redisClient.hmsetAsync(req.body.email, objCaptcha)
      console.log('replyCountExpires cria', isOk)
      return res.status(status).json(respObj)
    }
    /* Se expiorado OU Erro no form (eg. senha nao bate) */
    if (replyCountExpires < Date.now() || !respObj.success) {
      console.log('!respObj.success')
      const replyIncrCount = await redisClient.hincrbyAsync(objCaptcha.email, 'count', 1)
      console.log('replyIncrCount', replyIncrCount)

      /* count maior que 2 */
      if (replyIncrCount >= 2) {
        const hasCaptchaOk = await redisClient.hmsetAsync(objCaptcha.email, 'hasCaptcha', true)
        console.log('set hasCaptcha true', hasCaptchaOk)
        respObj.hasCaptchaComponent = true
      }
      return res.status(status).json(respObj)
    }

    /* Sucesso no form (senha e login ok) */
    console.log('Tudo ok')
    const delIsOK = await redisClient.del(objCaptcha.email)
    console.log('delIsOK', delIsOK)
    /* Só pra garantir */
    respObj.hasCaptchaComponent = false
    return res.status(status).json(respObj)

  /* Só entra aqui se houver erros de modulos */
  } catch (error) {
    console.error('ERRO GRAVE: ', error)
    return
  }
}

export default router
// module.exports = router
