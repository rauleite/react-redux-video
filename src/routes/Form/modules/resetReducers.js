import { PROCESS_FORM, ON_ENTER_HOOK, CHANGE_USER, LOCATION_CHANGE } from '../consts'
import { deepFreeze } from '../../utils/dev-mode'
import { Map } from 'immutable'

const initialState = Map({
  errors: Map({
    email: '',
    password: '',
    confirmePassword: '',
    summary: ''
  }),
  user: Map({
    token: '',
    email: '',
    password: '',
    confirmePassword: ''
  }),
  success: true,
  successMessage: ''
})

export default function resetReducer (state = initialState , action) {
  deepFreeze(state)

  switch (action.type) {
    case PROCESS_FORM:
      const result = state
        .setIn(
          ['user', 'email'],
          action.payload.user &&
          action.payload.user.email
            ? action.payload.user.email
            : state.getIn(['user', 'email'])
        )
        .setIn(
          ['user', 'password'],
          action.payload.user &&
          action.payload.user.password
            ? action.payload.user.password
            : state.getIn(['user', 'password'])
        )
        .setIn(
          ['user', 'confirmePassword'],
          action.payload.user &&
          action.payload.user.confirmePassword
            ? action.payload.user.confirmePassword
            : state.getIn(['user', 'confirmePassword'])
        )
        .setIn(
          ['user', 'token'],
          action.payload.user &&
          action.payload.user.token
            ? action.payload.user.token
            : state.getIn(['user', 'token'])
        )
        .setIn(
          ['errors', 'summary'],
          action.payload.errors &&
          action.payload.errors.summary
            ? action.payload.errors.summary
            : state.getIn(['errors', 'summary'])
      )
        .set('success', action.payload.success)

        .set('successMessage',
          action.payload.successMessage || state.get('successMessage'))

      console.log('result', result)
      return result

    case ON_ENTER_HOOK:
      const resultHook = state
        .setIn(
          ['user', 'email'],
          action.payload.user &&
          action.payload.user.email
            ? action.payload.user.email
            : state.getIn(['user', 'email'])
        )
        .setIn(
          ['user', 'password'],
          action.payload.user &&
          action.payload.user.password
            ? action.payload.user.password
            : state.getIn(['user', 'password'])
        )
        .setIn(
          ['user', 'confirmePassword'],
          action.payload.user &&
          action.payload.user.confirmePassword
            ? action.payload.user.confirmePassword
            : state.getIn(['user', 'confirmePassword'])
        )
        .setIn(
          ['user', 'token'],
          action.payload.user &&
          action.payload.user.token
            ? action.payload.user.token
            : state.getIn(['user', 'token'])
        )
        .setIn(
          ['errors', 'summary'],
          action.payload.errors &&
          action.payload.errors.summary
            ? action.payload.errors.summary
            : state.getIn(['errors', 'summary'])
      )
        .set('success', action.payload.success)

        .set('successMessage',
          action.payload.successMessage || state.get('successMessage'))

      console.log('resultHook', resultHook)
      return resultHook

    case CHANGE_USER:
      const input = action.payload
      const field = input.name

      const isField = {
        name: field === 'name',
        email: field === 'email',
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
      return state
  }
}
