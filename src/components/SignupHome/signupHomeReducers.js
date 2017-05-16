import { 
  PROCESS_FORM_SIGNUP_HOME,
  CHANGE_USER_SIGNUP_HOME,
  LOCATION_CHANGE 
} from '../../routes/Form/consts'
import { deepFreeze } from '../../routes/utils/dev-mode'
import { changeUser } from '../../routes/Form/modules/logic/signupLogic'
import { initialState } from '../../routes/Form/modules/logic/utils/initialState'
import { setAllStates, setMapStates } from '../../routes/Form/modules/logic/utils/logicUtils'

export default function signupReducer (state = initialState, action) {
  deepFreeze(state)
  console.info('SIGNUP REDUCER')
  console.info('|__ state.user', state.get('user'))
  console.info('|__ action', action)
  switch(action.type) {

    /* *** PROCESS FORM *** */
    case PROCESS_FORM_SIGNUP_HOME:
      return setAllStates(state, action.payload)

    /* *** CHANGE CHANGE_USER *** */
    case CHANGE_USER_SIGNUP_HOME:
      const result = changeUser(state, action)
      return setMapStates(state, result)
      
    /* *** LOCATION CHANGE *** */
    case LOCATION_CHANGE:
      return initialState
      
    default:
      return state
  }
}
