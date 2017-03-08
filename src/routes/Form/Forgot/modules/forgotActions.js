import Auth from '../../../../modules/Auth'
import { browserHistory } from 'react-router'
import { CHANGE_USER, PROCESS_FORM } from './consts'
import { sendUser } from '../../../utils/ajax'

/**
 * @param {Object} Event Objeto de evento javascript
*/
export function processForm (event) {
  event.preventDefault()
  return (dispatch, getState) => {
    const userState = getState().forgot.get('user')

    sendUser('/auth/forgot', userState.toJS(), (error, response) => {
      if (err) {
        const errors = err.erros ? err.erros : {}
        errors.summary = err.message

        console.error('errors', errors)

        return dispatch({
          type: PROCESS_FORM,
          payload: {
            errors,
            user: userState
          }
        })
      }

      dispatch({
        type: PROCESS_FORM,
        payload: {
          errors: {},
          user: userState
        }
      })
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
