import { PROCESS_FORM, CHANGE_USER, LOCATION_CHANGE } from '../consts'
import { deepFreeze } from '../../utils/dev-mode'
import { Map } from 'immutable'

// successMessage: '',
const initialState = Map({
  errors: Map({
    email: '',
    summary: ''
  }),
  user: Map({
    email: ''
  }),
  successMessage: ''
})

export default function forgotReducer (state = initialState, action) {
  deepFreeze(state)

  switch (action.type) {
    case PROCESS_FORM:
      const success = action.payload.successMessage
      return state
        .setIn(
          ['user', 'email'],
          action.payload.input 
            ? action.payload.input 
            : state.getIn(['user', 'email'])
        )
        .setIn(
          ['errors', 'summary'],
            action.payload.errors &&
            action.payload.errors.summary
              ? action.payload.errors.summary 
              : state.getIn(['errors', 'summary'])
        )
        .set('successMessage',
          success || state.get('successMessage'))

    case CHANGE_USER:
      const inputElement = action.payload

      let user = state.get('user')
      return state
        .set('user', user.set('email', inputElement.value))

    case LOCATION_CHANGE:
      return initialState

    default:
      return state
  }
}
