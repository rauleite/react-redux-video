import { PROCESS_FORM, CHANGE_USER, LOCATION_CHANGE } from '../consts'
import { deepFreeze } from '../../utils/dev-mode'
import { initialState } from './logic/utils/initialState'
import { changeUser } from './logic/signupLogic'
import { setAllStates, setMapStates } from './logic/utils/logicUtils'

export default function signupReducer (state = initialState, action) {
  deepFreeze(state)
  /* *** PROCESS FORM *** */
  if (action.type === PROCESS_FORM) {
    return setAllStates(state, action.payload)
  /* *** CHANGE CHANGE_USER *** */
  } else if (action.type === CHANGE_USER) {
    const result = changeUser(state, action)
    return setMapStates(state, result)
  /* *** LOCATION CHANGE *** */
  } else if (action.type === LOCATION_CHANGE) {
    return initialState
  } else {
    return state
  }
}
