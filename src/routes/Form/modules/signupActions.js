import { CHANGE_USER } from '../consts'
import { redirectToPrevUrl } from '../../utils/url'
import { sendForm } from '../formUtils'

/**
 * Action para onChange
 *
 * @param {event} event Evento onChange
 * @return {funciton} Redux Thunk
 */
export function changeUser (event) {
  return {
    type: CHANGE_USER,
    payload: {
      input: event.target
    }
  }
}

/**
 * @param {object} event - the JavaScript event object
 */
export function processForm (event) {
  event.preventDefault()
  return (dispatch, getState) => {
    const userState = getState().signup.get('user')

    sendForm('/auth/signup', userState, dispatch, (res) => {
      // make a redirect
      redirectToPrevUrl()
    })
  }
}
