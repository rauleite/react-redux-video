import { PROCESS_FORM, CHANGE_USER, LOCATION_CHANGE } from '../../consts'
import { deepFreeze } from '../../../utils/dev-mode'
import { cloneDeep } from 'lodash'

// successMessage: '',
const initialState = {
  errors: {
    // name: '',
    password: '',
    email: '',
    summary: ''
  },
  user: {
    // name: '',
    password: '',
    email: ''
  },
  successMessage: ''
}

export default function forgotReducer (state = initialState, action) {
  console.log('* loginReducer *')
  console.log('---- state', state)
  console.log('---- action', action)
  deepFreeze(state)

  switch (action.type) {
    case PROCESS_FORM:
      return {
        errors: state.errors,
        user: state.user,
        successMessage: state.successMessage
      }

    case CHANGE_USER:
      const input = action.payload
      const field = input.name

      let isEmail = field === 'email'
      let isPassword = field === 'password'

      let user = cloneDeep(state.user)
      user.email = isEmail ? input.value : state.user.email
      user.password = isPassword ? input.value : state.user.password

      return {
        user,
        errors: state.errors,
        successMessage: state.successMessage
      }

    case LOCATION_CHANGE:
      return initialState

    default:
      return state
  }
}
