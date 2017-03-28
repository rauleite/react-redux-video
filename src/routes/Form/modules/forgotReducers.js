import { PROCESS_FORM, CHANGE_USER, LOCATION_CHANGE } from '../consts'
import { deepFreeze } from '../../utils/dev-mode'
import { changeUser } from './logic/forgotLogic'
import { initialState } from './logic/utils/initialState'
// import {  } from './logic/utils/logicUtils'

export default function forgotReducer (state = initialState, action) {
  deepFreeze(state)
  console.log('forgotReducer', action.type)

  if (action.type === PROCESS_FORM) {
    if (action.payload.success) return state

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
  }

  if (action.type === CHANGE_USER) {
    const { user, styles, errors, button } = changeUser(state, action)
    return state
      .set('user', user)
      .set('styles', styles)
      .set('errors', errors)
      .set('button', button)
  // .set('input', inputElement(state, action))
  }

  if (action.type === LOCATION_CHANGE) {
    return initialState
  }

  return state
}
