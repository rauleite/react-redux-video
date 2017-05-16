import { PROCESS_FORM, CHANGE_USER, LOCATION_CHANGE } from '../consts'
import { deepFreeze } from '../../utils/dev-mode'
import { initialState } from './logic/utils/initialState'
import { changeUser } from './logic/signupLogic'
import { setAllStates, setMapStates } from './logic/utils/logicUtils'

export default function signupReducer (state = initialState, action) {
  deepFreeze(state)
  console.info('SIGNUP REDUCER')
  console.info('|__ state', state)
  console.info('|__ action', action)
  switch(action.type) {

    /* *** PROCESS FORM *** */
    case PROCESS_FORM:
      return setAllStates(state, action.payload)

    /* *** CHANGE CHANGE_USER *** */
    case CHANGE_USER:
      const result = changeUser(state, action)
      console.log('result --', result)
      return setMapStates(state, result)
      
    /* *** LOCATION CHANGE *** */
    case LOCATION_CHANGE:
      return initialState
      
    default:
      return state
  }
}
