import { PROCESS_FORM, CHANGE_USER, LOCATION_CHANGE } from '../consts'
import { deepFreeze } from '../../utils/dev-mode'
import { initialState, objInitialState } from './logic/utils/initialState'
import { changeUser } from './logic/loginLogic'
import { className, extractStateProp } from './logic/utils/logicUtils'

export default function loginReducer (state = initialState, action) {
  deepFreeze(state)

  console.log('loginReducer', action.type)

  if (action.type === PROCESS_FORM) {
    return state
      .set('user', extractStateProp(state, action, 'user'))
      .set('errors', extractStateProp(state, action, 'errors'))
      .set('styles', extractStateProp(state, action, 'styles'))
      .set('successMessage', extractStateProp(state, action, 'successMessage'))
      .set('button', extractStateProp(state, action, 'button'))
  } else if (action.type === CHANGE_USER) {
    const { user, errors, styles, button } = changeUser(state, action)
    return state
      .set('user', user)
      .set('errors', errors)
      .set('styles', styles)
      .set('button', button)
  } else if (action.type === LOCATION_CHANGE) {
    const successMessage = localStorage.getItem('successMessage')
    const email = localStorage.getItem('email')

    let hasStorage = false

    let objState = objInitialState()
    let stylesInit = objState.styles
    let userInit = objState.user

    if (successMessage) {
      localStorage.removeItem('successMessage')
      stylesInit.infoMessage = className.success
      hasStorage = true
    }

    if (email) {
      localStorage.removeItem('email')
      userInit.email = email
      hasStorage = true
    }

    if (!hasStorage) {
      return initialState
    }

    return initialState
      .set('successMessage', successMessage)
      .set('styles', stylesInit)
      .set('user', userInit)
  } else {
    return state
  }
}
