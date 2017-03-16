import { sendUser } from '../utils/ajax'
import { PROCESS_FORM } from './consts'

export function sendForm (path, userState, dispatch, callback) {
  sendUser(path, userState, (err, res) => {
    if (err) {
      const errors = err.erros ? err.erros : {}
      errors.summary = err.message

      const dispatchError = {
        type: PROCESS_FORM,
        payload: {
          errors,
          user: userState,
          successMessage: ''
        }
      }

      console.log('dispatchError', dispatchError)

      return dispatch(dispatchError)
    }

    const dispatchSuccess = {
      type: PROCESS_FORM,
      payload: {
        errors: {},
        user: userState,
        successMessage: res.message
      }
    }

    console.log('dispatchSuccess', dispatchSuccess)
    dispatch(dispatchSuccess)

    if (callback) {
      return callback(res)
    }
  })
}
