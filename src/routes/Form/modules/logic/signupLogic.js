import { style,
  className,
  inputUser,
  validateEmailWithStyles,
  validatePasswordWithStyles,
  validateNameWithStyles
} from './utils/logicUtils'

import { objInitialState } from './utils/initialState'
import { isEmpty } from 'lodash'

export function changeUser (state, action) {
  const fieldNames = ['name', 'email', 'password']
  const result = objInitialState

  const { user } = inputUser(state, action, fieldNames)

  result.user.name = user.name
  result.user.email = user.email
  result.user.password = user.password

  validateNameWithStyles(result)
  validateEmailWithStyles(result)
  validatePasswordWithStyles(result)

  result.button.disabled = isDisableButton(result, style)

  fieldNames.forEach((f) => {
    if (isEmpty(result.user[f])) {
      result.styles[f] = style.default
      result.errors[f] = ' '
    }
  })

  if (state.get('successMessage')) {
    result.styles.infoMessage = className.success
  }

  return {
    user: result.user,
    errors: result.errors,
    styles: result.styles,
    button: result.button,
  }
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
  return isDisabled
}
