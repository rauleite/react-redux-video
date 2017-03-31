import { Map } from 'immutable'

export const initialState = Map({ ...objInitialState() })

/**
 * Apenas representa o initialState
 */
export function objInitialState () {
  return {
    errors: {
      email: '',
      password: '',
      confirmePassword: '',
      captcha: '',
      summary: '',
      /** Erro de Preenchimento, front */
      errorForm: false
    },
    user: {
      token: '',
      passwordToken: '',
      email: '',
      password: '',
      confirmePassword: ''
    },
    input: {},
    styles: {
      infoMessage: {},
      email: {},
      password: {},
      confirmePassword: {},
      captcha: {}
    },
    button: {
      label: '',
      disabled: true
    },
    captcha: {
      value: {},
      element: {},
      hasCaptchaComponent: false
    },
    /* Vem do server */
    success: true,
    successMessage: ''
  }
}
