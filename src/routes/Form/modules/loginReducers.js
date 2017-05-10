import { PROCESS_FORM, CHANGE_USER, LOCATION_CHANGE, CHANGE_CAPTCHA } from '../consts'
// import { deepFreeze } from '../../utils/dev-mode'
import { initialState } from './logic/utils/initialState'
import { changeUser } from './logic/loginLogic'
import { className, setAllStates, setMapStates } from './logic/utils/logicUtils'
import { Map } from 'immutable'

export default function loginReducer (state = initialState, action) {
  // deepFreeze(state)
  if (action && action.payload) console.info('--- action.payload.captcha', action.payload.captcha)
  /* *** PROCESS FORM *** */
  if (action.type === PROCESS_FORM) {
    return setAllStates(state, action.payload)
  /* *** CHANGE USER *** */
  } else if (action.type === CHANGE_USER) {
    const result = changeUser(state, action)
    return setMapStates(state, result)
  /* *** CHANGE CAPTCHA *** */
  } else if (action.type === CHANGE_CAPTCHA) {
    const currentCaptcha = action.payload.captcha

    if (currentCaptcha && currentCaptcha.element) {
      return state
        .setIn(['captcha', 'element'], currentCaptcha.element)
    }
    console.info('state NOT updated', state.toJS())
    return state
  /* *** LOCATION CHANGE *** */
  } else if (action.type === LOCATION_CHANGE) {
    const successMessage = localStorage.getItem('successMessage')
    const email = localStorage.getItem('email')

    localStorage.removeItem('successMessage')
    localStorage.removeItem('email')

    if (!successMessage) {
      console.info('não há localStorage')
      return initialState
    }
    
    return initialState
      .setIn(['styles', 'infoMessage'], className.success)
      .setIn(['user', 'email'], email)
      .set('successMessage', successMessage)
  } else {
    return state
  }
}
