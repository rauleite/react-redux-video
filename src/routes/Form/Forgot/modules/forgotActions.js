import Auth from '../../../../modules/Auth'
import { browserHistory } from 'react-router'
import { CHANGE_USER, PROCESS_FORM } from './consts'
import { sendForm } from '../../formUtils'

/**
 * @param {Object} Event Objeto de evento javascript
*/
export function processForm (event) {
  event.preventDefault()
  return (dispatch, getState) => {
    const userState = getState().forgot.get('user')
    sendForm('/auth/forgot', userState, dispatch)
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
