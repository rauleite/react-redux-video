import { PROCESS_FORM, CHANGE_USER, LOCATION_CHANGE } from '../../consts'
import { deepFreeze } from '../../../utils/dev-mode'
import { Map } from 'immutable'

// successMessage: '',
const initialState = Map({
  errors: {
    email: '',
    summary: ''
  },
  user: Map({
    email: ''
  }),
  successMessage: ''
})

export default function forgotReducer (state = initialState, action) {
  deepFreeze(state)

  switch (action.type) {
    case PROCESS_FORM:
    return state
      .setIn(['user', 'email'], 
        action.payload.input ? action.payload.input : state.user)

    case CHANGE_USER:
      const inputElement = action.payload

      let user = state.get('user')
      return state
        .set('user', user.set('email', inputElement.value))
        // .set('errors', state.get(errors)
        // .set('successMessage', state.successMessage)

    case LOCATION_CHANGE:
      return initialState

    default:
      return state
  }
}
