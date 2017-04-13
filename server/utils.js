import { promisifyAll, promisify } from 'bluebird'
import jwt from 'jsonwebtoken'
import config from '../config/project.config'
import mongoose from 'mongoose'

/* Promisify some methods */
const User = promisifyAll(mongoose).model('User')
const verifyJwt = promisifyAll(jwt.verify)
const findById = promisifyAll(User.findById.bind(User))

/**
 * Valida o email
 * @param {string} email email em questão
 */
export function validateEmail (email) {
  var re = new RegExp([
    '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|',
    '(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|',
    '(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
  ].join(''))
  return re.test(email)
}

/**
 * Altera o objeto errors adicionando mensagem a propriedade email
 * @param {object} user
 * @param {object} errors
 * @param {boolean} isFormValid
 */
export function emailFormValidate (user, errors, isFormValid) {
  console.log('emailFormValidate()')
  if (user.email.length === 0) {
    console.error('ERRO GRAVE: Email vazio')
    errors.email = 'Erro no formulário. Preencha corretamente.'
    return false
  }

  if (!validateEmail(user.email)) {
    console.error('ERRO GRAVE: Email não validado')
    errors.email = 'Erro no formulário. Preencha corretamente.'
    return false
  }

  return true
}

/**
 * Altera o objeto errors adicionando mensagem a propriedade email
 * @param {object} payload
 * @param {object} errors
 * @param {boolean} isFormValid
 */
export function passwordFormValidate (body, errors, isFormValid) {
  console.log('passwordFormValidate()')
  if (body.password.length < 8) {
    console.error('ERRO GRAVE: A senha deve ter pelo menos 8 dígitos.')
    // isFormValid = false
    errors.password = 'Erro no formulário. Preencha corretamente.'
    return false
  }

  if (!validatePassword(body.password)) {
    console.error('ERRO GRAVE: Senha não validada')
    // isFormValid = false
    errors.password = 'Erro no formulário. Preencha corretamente.'
    return false
  }

  return true
}

/**
 * Valida o password
 * @param {string} password senha em questão
 */
function validatePassword (password) {
  var re = /\s/
  return !re.test(password)
}

/**
 * Verifica se está autenticado
 * @param {string} token authentication token
 */
export async function verifyAuthentication (token) {
  try {
    const decoded = await verifyJwt(token, config.jwt_secret)
    console.log('decoded', decoded)
    const userId = decoded.sub

    // check if a user exists
    const user = await findById(userId)
    const dateNow = getDateNowFormartNormalizer()

    // console.info('user.validToken !== token', user.validToken !== token)
    // console.info('decoded.exp', decoded.exp)
    // console.info('user.validTokenExpires', user.validTokenExpires)
    // console.info('dateNow', dateNow)
    // console.info('dateNow < user.validTokenExpires', dateNow < user.validTokenExpires)

    /* Defensive block. Never should be enter in this if */
    if (dateNow > user.validTokenExpires) {
      try {
        addBlankValidToken(user)
        throw new Error('Esse ponto soh um Defensive block')
      } catch (error) {
        console.error('ERRO GRAVE', error)
      }
      return null
    }

    if (!user || user.validToken !== token) {
      console.log('Não teve autorização, deve retornar STATUS 401')
      return null
    }
    console.log('B')
    return user
  } catch (error) {
    console.log('ERRO GRAVE:', error)
    return null
  }
}

/**
 * Persiste string vazia no atributo de usuario, para invalidar qualquer token
 * @param {object} user
 */
export async function addBlankValidToken (user) {
  const save = promisify(user.save.bind(user))
  try {
    user.validToken = ''
    user.validTokenExpires = 0
    return await save()
  } catch (error) {
    console.error('ERRO GRAVE:', error)
    return null
  }
}

/**
 * Zera o atributo validToken. Orquestra a verificacao de auth e adiciona blankValidToken
 * @param {string} token
 */
export async function zeraValidToken (token) {
  const user = await verifyAuthentication(token)
  if (!user) {
    console.log('sem usuario no retorno do verifyAuthentication()')
    return null
  }
  return addBlankValidToken(user, (error, user) => {
    if (error) console.error('ERRO GRAVE:', error)
    return user
  })
}

/**
 * Return Date now in seconds, like jwt expires format
 * @param {number} timeExpires optional - plus in timeExpires
 */
export function getDateNowFormartNormalizer (timeExpires = 0) {
  /* divides by 1000 to make format like jwt.exp seconds format */
  return Math.round((Date.now() / 1000) + (timeExpires))
}
