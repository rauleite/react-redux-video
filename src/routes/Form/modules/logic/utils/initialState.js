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
      confirmePassword: {}
    },
    button: {
      label: '',
      disabled: true
    },
    /* Vem do server */
    success: true,
    successMessage: ''
  }
}
