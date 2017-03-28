import { style, className, inputUser, changeState, validateEmailWithStyles } from './utils/logicUtils'
import { objInitialState } from './utils/initialState'
import { isEmpty } from 'lodash'

export function changeUser (state, action) {
  const fieldNames = ['email', 'password']

  const result = objInitialState()

  const { user } = inputUser(state, action, fieldNames)

  result.user.email = user.email
  result.user.password = user.password

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

  if (
    result.styles.password === style.success &&
    result.styles.email === style.success
  ) {
    result.button.disabled = false
  } else {
    result.button.disabled = true
  }

  fieldNames.forEach((f) => {
    if (isEmpty(result.user[f])) {
      result.styles[f] = style.default
    }
  })

  if (state.get('successMessage')) {
    result.styles.infoMessage = className.success
  }

  return changeState(result)
}
