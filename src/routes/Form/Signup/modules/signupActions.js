import { CHANGE_USER, PROCESS_FORM } from '../consts'
import { redirectToPrevUrl } from '../../../utils/url'
import { sendUser } from '../../../utils/ajax'

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
    const userState = getState().signup.get('user')

    sendUser('/auth/signup', userState.toJS(), (err, resp) => {
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

      // make a redirect
      redirectToPrevUrl()
    })
  }
}
