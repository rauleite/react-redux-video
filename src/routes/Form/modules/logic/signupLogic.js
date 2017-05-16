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
  const fieldNames = [
    'name',
    'email',
    'password'
  ]
  const fieldNamesSignupHome = [
    'nameSignupHome',
    'emailSignupHome',
    'passwordSignupHome'
  ]

  const result = objInitialState

  let { user, isField } = inputUser(
    state, action, fieldNames.concat(fieldNamesSignupHome))

  let userSignupHome = null
  let sufixo = ''
  fieldNamesSignupHome.forEach((f, index) => {
    if (isField[f]) {
      sufixo = 'SignupHome'
      userSignupHome = user
      user = null
      return
    }
  })
  console.log('user', user)
  console.log('userSignupHome', userSignupHome)
  const userTemp = user || userSignupHome

  const name = userTemp[`name${sufixo}`]
  const email = userTemp[`email${sufixo}`]
  const password = userTemp[`password${sufixo}`]

  result.user.name = name
  result.user.email = email ? email.trim() : email
  result.user.password = password ? password.trim() : password

  console.log('result.user.name', result.user.name)

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

  const resultFinal = {
    errors: result.errors,
    styles: result.styles,
    button: result.button,
  }
  console.log('sufixo', sufixo)
  if (sufixo) {
    resultFinal[`user${sufixo}`] = result.user
    result.user = null
  } else {
    resultFinal.user = result.user
  }

  console.log('resulFinal', resultFinal)

  return resultFinal
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
