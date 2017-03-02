export const CHANGE_USER = 'CHANGE_USER'
export const PROCESS_FORM = 'PROCESS_FORM'
export const LOCATION_CHANGE = 'LOCATION_CHANGE'

export const SIGNUP_INITIAL_STATE = {
  errors: {
    name: '',
    password: '',
    email: ''
  },
  successMessage: '',
  user: {
    name: '',
    password: '',
    email: ''
  }
}
