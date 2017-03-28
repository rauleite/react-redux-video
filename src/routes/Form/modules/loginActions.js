import Auth from '../../../modules/Auth'
import { CHANGE_USER, PROCESS_FORM } from '../consts'
import { redirectToPrevUrl } from '../../utils/url'
import { sendForm } from '../formUtils'
import { style } from './logic/utils/logicUtils'

/**
 * @param {Object} Event Objeto de evento javascript
*/
export function processForm (event) {
  event.preventDefault()
  return (dispatch, getState) => {
    dispatch({
      type: PROCESS_FORM,
      payload: {
        button: {
          label: 'ENVIANDO...',
          disabled: true
        }
      }
    })
    const user = getState().login.get('user')
    sendForm('/auth/login', user, dispatch, (error, res) => {
      if (error) {
        return dispatch({
          type: PROCESS_FORM,
          payload: {
            errors: error,
            user: user,
            successMessage: '',
            styles: {
              email: style.error,
              password: style.error
            },
            button: {
              label: 'REDIGITE...',
              disabled: true
            }
          }
        })
      }
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
    payload: {
      input: event.target
    }
  }
}
