import { browserHistory } from 'react-router'
import { CHANGE_USER, PROCESS_FORM } from '../consts'

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
    const state = getState().signup

    // create a string for an HTTP body message
    const name = encodeURIComponent(state.user.name)
    const email = encodeURIComponent(state.user.email)
    const password = encodeURIComponent(state.user.password)
    const formData = `name=${name}&email=${email}&password=${password}`

    // create an AJAX request
    const xhr = new XMLHttpRequest()
    xhr.open('post', '/auth/signup')
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    xhr.responseType = 'json'
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // change the component-container state
        dispatch({
          type: PROCESS_FORM,
          payload: {
            errors: {},
            user: state.user
          }
        })

        // set a message
        localStorage.setItem('successMessage', xhr.response.message)
        console.log('get item', localStorage.getItem('successMessage'))

        // make a redirect
        browserHistory.push('/')
      } else {
        // failure

        const errors = xhr.response.errors ? xhr.response.errors : {}
        errors.summary = xhr.response.message

        dispatch({
          type: PROCESS_FORM,
          payload: {
            errors,
            user: state.user
          }
        })
      }
    })
    xhr.send(formData)
  }
}
