import { Map } from 'immutable'

export const initialState = Map({ ...objInitialState() })
export const initialState2 = objInitialState2()

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
      value: '',
      element: {},
      hasCaptchaComponent: false
    },
    /* Vem do server */
    success: true,
    successMessage: ''
  }
}

/**
 * Apenas representa o initialState
 */
export function objInitialState2 () {
  return Map({
    errors: Map({
      email: '',
      password: '',
      confirmePassword: '',
      captcha: '',
      summary: '',
      /** Erro de Preenchimento, front */
      errorForm: false
    }),
    user: Map({
      token: '',
      passwordToken: '',
      email: '',
      password: '',
      confirmePassword: ''
    }),
    input: {},
    styles: Map({
      infoMessage: {},
      email: {},
      password: {},
      confirmePassword: {},
      captcha: {}
    }),
    button: Map({
      label: '',
      disabled: true
    }),
    captcha: Map({
      value: {},
      element: {},
      hasCaptchaComponent: false
    }),
    /* Vem do server */
    success: true,
    successMessage: ''
  })
}

/**
 * Apenas representa o initialState
 */
export let objInitialState22

(() => { objInitialState22 = objInitialState2().toJS() })()
