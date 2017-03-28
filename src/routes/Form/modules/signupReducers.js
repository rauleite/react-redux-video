import { PROCESS_FORM, CHANGE_USER, LOCATION_CHANGE } from '../consts'
import { deepFreeze } from '../../utils/dev-mode'
import { initialState } from './logic/utils/initialState'
import { inputUser } from './logic/utils/logicUtils'
// successMessage: '',
// const initialState = Map({
//   errors: {
//     name: '',
//     password: '',
//     email: '',
//     summary: ''
//   },
//   user: Map({
//     name: '',
//     password: '',
//     email: ''
//   })
// })

export default function signupReducer (state = initialState, action) {
  deepFreeze(state)

  switch (action.type) {
    case PROCESS_FORM:
      return state
        .set('errors', action.payload.errors)
        .set('user', action.payload.user)

    case CHANGE_USER:
      const {
        user
      } = inputUser(state, action, ['name', 'email', 'password'])

      console.log('userrrr', user)
      return state.set('user', user)

    case LOCATION_CHANGE:
      return initialState

    default:
      return state
  }
}
