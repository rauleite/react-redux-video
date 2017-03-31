import { style,
  className,
  inputUser,
  captchaUser,
  validateEmailWithStyles
} from './utils/logicUtils'

import { objInitialState } from './utils/initialState'
import { isEmpty } from 'lodash'

export function changeUser (state, action) {
  const fieldNames = ['email', 'password']

  const result = objInitialState()

  const { user } = inputUser(state, action, fieldNames)

  result.user.email = user.email
  result.user.password = user.password

  const captcha = captchaUser(state, action, ['value', 'element', 'hasCaptchaComponent'])

  result.captcha.value = captcha.value
  result.captcha.element = captcha.element
  result.captcha.hasCaptchaComponent = captcha.hasCaptchaComponent

  validateEmailWithStyles(result)

  /* Só chega aqui se o campo for password */
  const passwordLt = result.user.password.length < 8

  // if (isField.password) {
  if (passwordLt) {
    result.errors.password = ' '
    result.styles.password = style.warning
  } else {
    result.errors.password = ' '
    result.styles.password = style.success
  }
  // }

  result.button.disabled = isDisableButton(result, style)

  fieldNames.forEach((f) => {
    if (isEmpty(result.user[f])) {
      result.styles[f] = style.default
    }
  })

  if (state.get('successMessage')) {
    result.styles.infoMessage = className.success
  }

  return result
}

function isDisableButton (result, style) {
  let isDisabled = true

  if (
    result.styles.password === style.success &&
    result.styles.email === style.success
  ) {
    isDisabled = false
  } else {
    isDisabled = true
  }

  console.log('result.captcha.hasCaptchaComponent', result.captcha.hasCaptchaComponent)
  console.log('result.captcha.value', result.captcha.value)

  if (!isDisabled && result.captcha.hasCaptchaComponent) {
    if (!isEmpty(result.captcha.value)) {
      isDisabled = false
    } else {
      isDisabled = true
    }
  }
  return isDisabled
}
