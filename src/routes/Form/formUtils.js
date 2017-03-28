import { sendUser } from '../utils/ajax'

export function sendForm (path, userState, dispatch, callback) {
  sendUser(path, userState, (error, res) => {
    if (error) {
      const errors = error.erros ? error.erros : {}
      errors.summary = error.message

      // const dispatchError = {
      //   type: PROCESS_FORM,
      //   payload: {
      //     errors,
      //     user: userState,
      //     successMessage: ''
      //   }
      // }

      if (callback) {
        return callback(errors, res)
      }

      // return dispatch(dispatchError)
    }

    // const dispatchSuccess = {
    //   type: PROCESS_FORM,
    //   payload: {
    //     errors: {},
    //     user: userState,
    //     successMessage: res.message
    //   }
    // }

    // dispatch(dispatchSuccess)
    if (callback) {
      return callback(error, res)
    }
  })
}
