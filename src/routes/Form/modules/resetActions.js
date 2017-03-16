import { CHANGE_USER } from '../consts'
import { redirectToUrl } from '../../utils/url'
import { sendForm } from '../formUtils'

/**
 * Action para onChange
 *
 * @param {Event} event Evento onChange
 * @return {Function} Redux Thunk
 */
export function changeUser (event) {
  return {
    type: CHANGE_USER,
    payload: event.target
  }
}

/**
 * @param {object} event - the JavaScript event object
 */
export function processForm (event) {
  event.preventDefault()
  return (dispatch, getState) => {
    // const userState = getState().signup.get('user')
    const userState = getState().reset.get('user')

    sendForm('/auth/reset', userState, dispatch, (res) => {
      redirectToUrl('/login')
    })
  }
}
