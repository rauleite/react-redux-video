import { 
  CHANGE_USER_SIGNUP_HOME,
  PROCESS_FORM_SIGNUP_HOME
} from '../../routes/Form/consts'
import { sendForm } from '../../routes/Form/formUtils'
import { redirectToUrl } from '../../utils/url'

/**
 * Action para onChange
 *
 * @param {event} event Evento onChange
 * @return {funciton} Redux Thunk
 */
export function changeUser (event) {
  return {
    type: CHANGE_USER_SIGNUP_HOME,
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
    const user = getState().signup.get('user').toJS()
    console.log('user', user)

    sendForm('/auth/signup', { body: user }, (error, res) => {
      dispatch({
        type: PROCESS_FORM_SIGNUP_HOME,
        payload: {
          button: {
            label: 'ENVIANDO...',
            disabled: true
          }
        }
      })
      if (error) {

      }
      console.log(res)
      console.log(res.success)
      if (res && res.success) {
        console.log('entrou')
        console.log(res)
        console.log(res.success)
        dispatch({
          type: CHANGE_USER_SIGNUP_HOME,
          payload: {
            user
          }
        })
        redirectToUrl('/login')
      } else {

      }
    })
  }
}
