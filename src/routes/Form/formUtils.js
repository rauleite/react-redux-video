import { sendUser } from '../utils/ajax'
import { PROCESS_FORM } from './consts'

export function sendForm (path, userState, dispatch, callback) {
  sendUser(path, userState, (err, res) => {
    console.log('res', res)
    console.log('dispatch', dispatch)

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
        user: userState,
        successMessage: res.message
      }
    })

    if (callback) {
      callback(res)
    }
  })
}
