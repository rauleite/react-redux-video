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

  const isField = isCorrectField(fieldNames, input)

  let user = {}
  fieldNames.forEach(function (f) {
    user[f] = input.name === f ? input.value.trim() : state.get('user')[f]
  })
  return { user, isField }
}

/**
 * Retorna o State[propName]
 * @param {object} state
 * @param {object} action
 * @param {string} propName
 * @returns {object} prop
 */
export function extractStateProp (state, action, propName) {
  return (
  action.payload &&
  /* Se houver payload.propName, mesmo que seja string vazia */
  action.payload[propName] || action.payload[propName] === ''
    ? action.payload[propName]
    : state.get(propName)
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
 * Valida email e ja acionando os devidos styles (Modifica objeto result)
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
