import { sendUser } from '../utils/ajax'

export function sendForm (path, data, dispatch, callback) {
  sendUser(path, data, (error, res) => {
    if (error) {
      const errors = error.erros ? error.erros : {}
      errors.summary = error.message

      if (callback) {
        return callback(errors, res)
      }
    }

    // dispatch(dispatchSuccess)
    if (callback) {
      return callback(error, res)
    }
  })
}
