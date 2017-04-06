import { orange700, green700, red700, cyan700 } from 'material-ui/styles/colors'

/* Para estilos material-ui components */
export let style = {
  success: { color: green700 },
  warning: { color: orange700 },
  error: { color: red700 },
  default: { color: cyan700 }
}

/* Para classes scss */
export let className = {
  success: 'success-message',
  warning: 'warning-message',
  error: 'error-message'
}

export const messages = {
  password: {
    empty: 'Tem que digitar uma senha ¬¬',
    small: 'Deve ter no mínimo 8 caracteres.',
    notMatch: '=/',
    correct: '=D'
  },
  confirmeEmail: {
    notMatch: 'A senha e confirmação não coincidem.',
    correct: '=D'
  }
}

/**
 * Muda o estado com valors atuais
 * @param {object} result As propriedades deste parametro, devem conter o mesmo nome do State
 */
export function changeState ({ user, styles, errors, button }) {
  return {
    user,
    styles,
    errors,
    button
  }
}

/**
 * Handle Comon input
 * @param {object} action
 */
export function inputUser (state, action, fieldNames) {
  const input = extractStateProp(state, action, 'input')

  console.log('input', input)

  const isField = isCorrectField(fieldNames, input)

  let user = {}
  fieldNames.forEach(function (f) {
    user[f] = input.name === f ? input.value : state.getIn(['user', f])
  })
  return { user, isField }
}

// export function captchaUser (state, action, propNames) {
//   const captcha = action.payload && action.payload.captcha ? action.payload.captcha : null
//   const captchaState = state.get('captcha')

//   let result = {}

//   propNames.forEach(p => {
//     result[p] = captcha && captcha[p] && captcha[p] !== captchaState[p] ? captcha[p] : captchaState[p]
//   })

//   return result
// }

/**
 * Retorna o State[propName]
 * @param {object} state
 * @param {object} action
 * @param {string} propName
 * @returns {object} prop
 */
export function extractStateProp (state, action, propName, isNullAlternative) {
  console.log('action.payload.' + propName, action.payload[propName])
  return (
  action.payload &&
  /* Se houver payload.propName, mesmo que seja string vazia */
  action.payload[propName] || action.payload[propName] === ''
    ? action.payload[propName]
    : isNullAlternative ? null : state.get(propName)
  )
}

/**
 * Retorna objeto contendo campo atual como true
 * @param {Array} fieldNames field names
 * @param {object} input element input
 * @returns {object}
 */
export function isCorrectField (fieldNames, input) {
  let isField = {}
  fieldNames.forEach(function (f) {
    isField[f] = input.name === f
  })
  return isField
}

/**
 * Valida email e ja adiciona os devidos styles (Modifica objeto result)
 * @param {object} result state result
 */
export function validateEmailWithStyles (result) {
  if (validateEmail(result.user.email)) {
    result.styles.email = style.success
    result.errors.email = ' '
    return true
  } else {
    result.styles.email = style.warning
    result.errors.email = ' '
    return false
  }
}

/**
 * Valida password e ja adiciona os devidos styles (Modifica objeto result)
 * @param {object} result
 */
export function validatePasswordWithStyles (result) {
  const passwordLt = result.user.password.length < 8
  const passwordZero = result.user.password.length === 0

  if (passwordZero) {
    result.styles.password = style.default
    result.errors.password = ' '
    return
  }

  if (!validatePassword(result.user.password)) {
    result.styles.password = style.error
    result.errors.password = 'Não pode ter espaços'
  } else if (passwordLt) {
    result.styles.password = style.warning
    result.errors.password = '8 dígitos no mínimo'
  } else {
    result.styles.password = style.success
    result.errors.password = ' '
  }
}

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
 * Valida o password
 * @param {string} password senha em questão
 */
export function validatePassword (password) {
  var re = /\s/
  return !re.test(password)
}

/**
 * Monta o objeto com seus devidos atribuos
 * @param {string} value Valor do campo
 * @param {string} msg Mensagem de erro
 */
export function montaObjMesssages (value, msg) {
  return {
    value: value,
    msg: {
      empty: msg.empty ? msg.empty : '',
      small: msg.small ? msg.small : '',
      notMatch: msg.notMatch ? msg.notMatch : '',
      correct: msg.correct ? msg.correct : ''
    }
  }
}

// module.exports = {
//   style,
//   className
// }

// /**
//  * Retorna o input element
//  * @param {object} state
//  * @param {object} action
//  */
// export function inputElement(state, action) {
//   return (
//     action.payload &&
//     action.payload.input
//       ? action.payload.input
//       : state.get('input')
//   )
// }
