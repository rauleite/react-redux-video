import { PROCESS_FORM, ON_ENTER_HOOK, CHANGE_USER, LOCATION_CHANGE } from '../consts'
import { deepFreeze } from '../../utils/dev-mode'
import { changeUser } from './logic/resetLogic'
import { initialState } from './logic/utils/initialState'

export default function resetReducer (state = initialState, action) {
  deepFreeze(state)
  console.log('resetReducer', action.type)

  switch (action.type) {
    case PROCESS_FORM:
      // const result = processForm(state, action)
      return state
        .set('errors',
          action.payload.errors
            ? action.payload.errors
            : state.get('errors')
      )
        .set('styles',
          action.payload.styles
            ? action.payload.styles
            : state.get('styles')
      )
        .set('button',
          action.payload.button
            ? action.payload.button
            : state.get('button')
      )
        .set('successMessage',
          action.payload.successMessage
            ? action.payload.successMessage
            : state.get('successMessage')
      )

    case ON_ENTER_HOOK:
      const resultHook = state
        .set('user',
          action.payload.user
            ? action.payload.user
            : state.get('user')
      )
        .set('errors',
          action.payload.errors
            ? action.payload.errors
            : state.get('errors')
      )
        .set('success', action.payload.success)

        .set('successMessage',
          action.payload.successMessage || state.get('successMessage'))

      return resultHook

    case CHANGE_USER:
      const { style, errors, button, user } = changeUser(state, action)

      return (
      state.set('styles', style)
        .set('errors', errors)
        .set('button', button)
        .set('user', user)
      )

    case LOCATION_CHANGE:
      return initialState

    default:
      return state
  }
}
