import Auth from '../../../../modules/Auth'
import { CHANGE_USER, PROCESS_FORM } from './consts'
import { redirectToPrevUrl } from '../../../utils/url'
import { sendUser } from '../../../utils/ajax'
import { Map } from 'immutable'

/**
 * @param {Object} Event Objeto de evento javascript
*/
export function processForm (event) {
  event.preventDefault()
  return (dispatch, getState) => {
    const userState = getState().login.get('user')

    sendUser('/auth/login', userState.toJS(), (err, resp) => {
      if (err) {
        const errors = err.erros ? err.erros : {}
        errors.summary = err.message

        console.log('errors', errors)

        return dispatch({
          type: PROCESS_FORM,
          payload: {
            errors,
            successMessage: '',
            user: userState
          }
        })
      }

      Auth.authenticateUser(resp.token)
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
