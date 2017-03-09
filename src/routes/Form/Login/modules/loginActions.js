import Auth from '../../../../modules/Auth'
import { CHANGE_USER, PROCESS_FORM } from './consts'
import { redirectToPrevUrl } from '../../../utils/url'
import { sendForm } from '../../formUtils'
import { Map } from 'immutable'

/**
 * @param {Object} Event Objeto de evento javascript
*/
export function processForm (event) {
  event.preventDefault()
  return (dispatch, getState) => {
    const userState = getState().login.get('user')
    sendForm('/auth/login', userState, dispatch, (res) => {
      Auth.authenticateUser(res.token)
      redirectToPrevUrl()
    })
  }
}

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
