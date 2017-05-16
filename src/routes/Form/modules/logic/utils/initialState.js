import { Map } from 'immutable'

export const initialState = initialStateImmutable()

/**
 * Apenas representa o initialState
 */
export let objInitialState

(() => { objInitialState = initialStateImmutable().toJS() })()

/**
 * Apenas representa o initialState
 */
function initialStateImmutable () {
  return Map({
    errors: Map({
      name: '',
      email: '',
      password: '',
      confirmePassword: '',
      captcha: '',
      summary: '',
      /** Erro de Preenchimento, front */
      errorForm: false
    }),
    user: Map({
      name: '',
      passwordToken: '',
      email: '',
      password: '',
      confirmePassword: '',
      token: ''
    }),
    /* 
      Variacao do user que teve que ser criada, pra não gerar conflito com o user
      do loginNav, na homepage.
     */
    userSignupHome: Map({
      name: '',
      passwordToken: '',
      email: '',
      password: '',
      confirmePassword: '',
      token: ''
    }),
    input: {},
    styles: Map({
      infoMessage: {},
      name: {},
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
