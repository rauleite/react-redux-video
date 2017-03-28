import { isEmpty } from 'lodash'
import { orange500, green500, red500 } from 'material-ui/styles/colors'
import { montaObjMesssages, isCorrectField } from './utils/logicUtils'

const warningStyle = 'warningStyle'
const defaultStyle = 'defaultStyle'
const correctStyle = 'correctStyle'

export function changeUser (state, action) {
  const fieldNames = ['password', 'confirmePassword']

  const st = {
    password: state.get('user').password,
    confirme: state.get('user').confirmePassword
  }

  const styles = objFields(fieldNames)
  const input = action.payload.input

  const isField = isCorrectField(fieldNames, input)

  // const isField = {
  //   password: input.name === 'password',
  //   confirme: input.name === 'confirmePassword'
  // }

  const password = montaObjMesssages(
    isField.password ? input.value.trim() : st.password,
    {
      empty: 'Tem que digitar uma senha ¬¬',
      small: 'Deve ter no mínimo 8 caracteres.',
      notMatch: '=/',
      correct: '=D'
    }
  )
  const confirme = montaObjMesssages(
    isField.confirmePassword ? input.value.trim() : st.confirme,
    {
      notMatch: 'A senha e confirmação não coincidem.',
      correct: '=D'

    }
  )

  let errors = {
    errorForm: false,
    summary: ''
  }

  const button = {
    disabled: true
  }

  const user = {
    password: password.value,
    confirmePassword: confirme.value,
    passwordToken: window.location.pathname.replace(/\/reset\//, '')
  }

  /* Se nao foi digitado nada nos dois campos: Reseta erros */
  if (
    (isEmpty(password.value)) &&
    (isEmpty(confirme.value))
  ) {
    errors.errorForm = false
    errors.password = ''
    errors.confirmePassword = ''
    return changeState(state, event, user, errors, styles, button, defaultStyle, ['password', 'confirmePassword'])
  }

  const passwordLt = password && password.value.length < 8
  const passwordGt = password && password.value.length >= 8

  if (passwordLt) {
    errors.errorForm = true
    errors.password = password.msg.small

    return changeState(state, event, user, errors, styles, button, warningStyle, ['password'])
  }

  const isPassAndConfirmMaches = (
  typeof password.value === 'string' &&
    typeof confirme.value === 'string' &&
    password.value === confirme.value
  )
  const isSameLengthButNotMatch = (
  typeof password.value === 'string' &&
    typeof confirme.value === 'string' &&
    confirme.value.length >= password.value.length &&
    password.value !== confirme.value
  )
  if (passwordGt || isSameLengthButNotMatch || isPassAndConfirmMaches) {
    if (isSameLengthButNotMatch) {
      errors.errorForm = true
      errors.password = password.msg.notMatch
      errors.confirmePassword = confirme.msg.notMatch
      return changeState(state, event, user, errors, styles, button, defaultStyle, ['password', 'confirmePassword'])
    }
    if (isPassAndConfirmMaches) {
      button.disabled = false
      errors.errorForm = false
      errors.password = password.msg.correct
      errors.confirmePassword = confirme.msg.correct
      return changeState(state, event, user, errors, styles, button, correctStyle, ['password', 'confirmePassword'])
    }
    if (passwordGt) {
      errors.errorForm = false
      errors.password = password.msg.correct
      return changeState(state, event, user, errors, styles, button, correctStyle, ['password'])
    }
  }
}

/**
  * Monta objeto
  * @param {Array} fieldNames Field name
  * @return {object} Objeto montado
*/
function objFields (fieldNames) {
  const styles = {}
  fieldNames.forEach(f => {
    styles[f] = {
      warningStyle: { color: orange500 },
      correctStyle: { color: green500 },
      defaultStyle: { color: red500 }
    }
  })

  return styles
}

/**
 * Configura o Dispatch para envio
 * @param {object} errors
 * @param {object} styles
 * @param {string} styleType
 * @param {Array} fieldsStyle
 */
function changeState (
  state, event, user, errors, styles, button, styleType, fieldsStyle) {
  const style = {}
  /* Configura campo e estilos corretos */
  fieldsStyle.forEach((f) => {
    if (styles.hasOwnProperty(f)) {
      style[f] = styles[f][styleType]
    } else {
      console.error('styles.hasOwnProperty(f)')
    }
  })

  return {
    style: style,
    errors,
    button,
    user
  }
}

// /**
//  * Função que altera (não immutable) o objeto errors
//  * @param {string} atributo Representa o atributo
//  * @param {string} msg Mensagem específica do atributo
//  */
// function configuraFieldErros (atributo, msg, hasError) {
//   if (hasError)
//     this.errorForm = hasError

//   this[atributo] = msg
// }
