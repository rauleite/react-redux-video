import { inputUser, changeState, validateEmailWithStyles } from './utils/logicUtils'
import { objInitialState } from './utils/initialState'

export function changeUser (state, action) {
  const fieldsStr = ['email']

  const { user } = inputUser(state, action, fieldsStr)

  const result = objInitialState()

  if (!user.email) {
    return changeState(result)
  }

  result.user.email = user.email

  const isValidEmail = validateEmailWithStyles(result)
  if (isValidEmail) {
    result.button.disabled = false
  }

  return changeState(result)
}

export function processForm (state, action) {
  console.log('processForm - forgotLogic')
  const result = objInitialState()
  result.user.email = inputUser(state, action, 'email').email
  result.button.disabled = true
  // const success = action.payload.successMessage
  return result
}

// /**
//  * Estado que sera trabalhado nesta logica
//  */
// function resultState () {
//   return {
//     user: {
//       email: ''
//     },
//     errors: {
//       email: '',
//       errorForm: false
//     },
//     styles: {
//       email: {}
//     },
//     button: {
//       disabled: true
//     }
//   }
// }
