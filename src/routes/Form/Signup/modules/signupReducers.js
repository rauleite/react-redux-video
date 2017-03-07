import { PROCESS_FORM, CHANGE_USER, LOCATION_CHANGE } from '../consts'
import { deepFreeze } from '../../../utils/dev-mode'
import { Map } from 'immutable'
// successMessage: '',
const initialState = Map({
  errors: {
    name: '',
    password: '',
    email: '',
    summary: ''
  },
  user: Map({
    name: '',
    password: '',
    email: ''
  })
})

export default function signupReducer (state = initialState, action) {
  deepFreeze(state)

  switch (action.type) {
    case PROCESS_FORM:
      console.log('case PROCESS_FORM')
      return state
        .set('errors', action.payload.errors)
        .set('user', action.payload.user)

    case CHANGE_USER:
      const input = action.payload
      const field = input.name

      const isField = {
        name: field === 'name',
        email : field === 'email',
        password: field === 'password'
      } 

      let user = state.get('user')

      let newUser = user
        .set('name', isField.name ? input.value : user.get('name'))
        .set('email', isField.email ? input.value : user.get('email'))
        .set('password', isField.password ? input.value : user.get('password'))

      return state.set('user', newUser)

    case LOCATION_CHANGE:
      return initialState

    default:
      console.log('case default')

      return state
  }
}
