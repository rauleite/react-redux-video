import { PROCESS_FORM, CHANGE_USER, LOCATION_CHANGE } from '../../consts'
import { deepFreeze } from '../../../utils/dev-mode'
// import { cloneDeep } from 'lodash'
import { Map } from 'immutable'

// successMessage: '',
const initialState = Map({
  errors: {
    password: '',
    email: '',
    summary: ''
  },
  user: Map({
    password: '',
    email: ''
  }),
  successMessage: ''
})

export default function loginReducer (state = initialState , action) {
  deepFreeze(state)

  switch (action.type) {
    case PROCESS_FORM:

      // console.log('loginReducer()', 'PROCESS_FORM', state)
      // console.log('loginReducer()', 'PROCESS_FORM', action)

      return state
        .set('errors', action.payload.errors)
        .set('user', action.payload.user)
        .set('successMessage', action.payload.successMessage)

    case CHANGE_USER:
      const input = action.payload
      const field = input.name

      const isField = {
        email: field === 'email',
        password: field === 'password'
      } 

      return state
        .setIn(['user', 'email'], isField.email ? 
          input.value : state.getIn(['user', 'email']))

        .setIn(['user', 'password'], isField.password ? 
          input.value : state.getIn(['user', 'password']))
      
    case LOCATION_CHANGE:
      // console.log('loginReducer()', 'LOCATION_CHANGE', state)
      // console.log('loginReducer()', 'LOCATION_CHANGE', action)
      return initialState

    default:
      return state
  }
}
