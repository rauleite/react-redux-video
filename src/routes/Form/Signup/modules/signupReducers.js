import { PROCESS_FORM, CHANGE_USER, LOCATION_CHANGE } from '../consts'
import { deepFreeze } from '../../../utils/dev-mode'
import { cloneDeep } from 'lodash'

// successMessage: '',
const initialState = {
  errors: {
    name: '',
    password: '',
    email: '',
    summary: ''
  },
  user: {
    name: '',
    password: '',
    email: ''
  }
}

export default function signupReducer (state = initialState, action) {
  deepFreeze(state)
  console.log('* signupReducer *')
  console.log('---- state', state)
  console.log('---- action', action)

  switch (action.type) {
    case PROCESS_FORM:
      console.log('case PROCESS_FORM')
      return {
        errors: action.payload.errors,
        user: action.payload.user
      }

    case CHANGE_USER:
      const input = action.payload
      const field = input.name

      let isEmail = field === 'email'
      let isPassword = field === 'password'
      let isName = field === 'name'

      let user = cloneDeep(state.user)
      user.email = isEmail ? input.value : state.user.email
      user.password = isPassword ? input.value : state.user.password
      user.name = isName ? input.value : state.user.name

      return {
        user,
        errors: state.errors
      }

    case LOCATION_CHANGE:
      return initialState

    default:
      console.log('case default')

      return state
  }
}
