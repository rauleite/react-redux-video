import Auth from '../../../../modules/Auth'
import { browserHistory } from 'react-router'
import { CHANGE_USER, PROCESS_FORM } from './consts'

/**
 * @param {Object} Event Objeto de evento javascript
*/
export function processForm (event) {
  event.preventDefault()
  return (dispatch, getState) => {
    const state = getState().forgot

    // create a string for an HTTP body message
    const email = encodeURIComponent(state.user.email)
    const password = encodeURIComponent(state.user.password)
    const formData = `email=${email}&password=${password}`

    // create an AJAX request
    const xhr = new XMLHttpRequest()
    xhr.open('post', '/auth/login')
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhr.responseType = 'json'
    xhr.addEventListener('load', () => {
      console.log('xhr.status', xhr.status)
      if (xhr.status === 200) {
        // success

        // change the component-container state
        // state.errors = {}
        // save the token
        Auth.authenticateUser(xhr.response.token)

        // change the current URL
        let redirectPrevUrl = localStorage.getItem('urlPrevLogin')
        console.log('redirectPrevUrl', redirectPrevUrl)
        if (redirectPrevUrl) {
          browserHistory.push(redirectPrevUrl)
        } else {
          browserHistory.push('/')
        }
      } else {
        // failure

        // change the component state
        const errors = xhr.response.errors ? xhr.response.errors : {}
        errors.summary = xhr.response.message

        dispatch({
          type: PROCESS_FORM,
          payload: {
            errors,
            successMessage: state.successMessage,
            user: state.user
          }
        })
      }
    })
    console.log('formData', formData)
    xhr.send(formData)
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
