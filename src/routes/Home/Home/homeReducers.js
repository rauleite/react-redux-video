import { 
  PROCESS_FORM,
  CHANGE_USER,
  LOCATION_CHANGE
} from './../../../utils/consts'

import loginHomeReducer from '../LoginHome/loginHomeReducers'
import signupHomeReducer from '../SignupHome/signupHomeReducers'

import { deepFreeze } from '../../utils/dev-mode'
import { initialState } from './../../../utils/initialState'
import { setAllStates, setMapStates } from './../../../utils/logicUtils'

export default function homeReducer (state = initialState, action) {
  deepFreeze(state)
  console.log('homeReducer', action.type)

  switch (action.type) {
    case 'LOGIN_HOME': {
      return loginHomeReducer(state, action.loginHome)
    }
    case 'SIGNUP_HOME': {
      return signupHomeReducer(state, action.signupHome)
    }
    default:
      return state
  }
}
