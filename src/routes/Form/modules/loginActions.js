import Auth from '../../../modules/Auth'
import { CHANGE_USER, PROCESS_FORM, CHANGE_CAPTCHA } from '../consts'
import { redirectToPrevUrl } from '../../utils/url'
import { sendForm } from '../formUtils'
import { style } from './logic/utils/logicUtils'

/**
 * @param {Object} Event Objeto de evento javascript
*/
export function processForm (event) {
  event.preventDefault()

  return (dispatch, getState) => {
    // const errors = {}
    // const captcha = getState().login.get('captcha')
    // console.log('captcha', captcha)

    // if (isEmpty(captcha)) {
    //   errors.summary = 'É necessário o preenchimento correto do captcha'
    //   return dispatch({
    //     type: PROCESS_FORM,
    //     payload: {
    //       errors,
    //       button: {
    //         label: 'ERRO...',
    //         disabled: true
    //       }
    //     }
    //   })
    // }
    dispatch({
      type: PROCESS_FORM,
      payload: {
        button: {
          label: 'ENVIANDO...',
          disabled: true
        }
      }
    })
    const user = getState().login.get('user').toJS()
    const captcha = getState().login.get('captcha').toJS()
    const captchaValue = captcha.value

    sendForm('/auth/login', { ...user, captchaValue }, dispatch, (error, res) => {
      console.log('res', res)
      if (error) {
        if (captcha.hasCaptchaComponent) captcha.element.reset()
        return dispatch({
          type: PROCESS_FORM,
          payload: {
            errors: error,
            user: user,
            successMessage: '',
            styles: {
              email: style.error,
              password: style.error
            },
            captcha: {
              value: '',
              element: captcha.element,
              hasCaptchaComponent: res.hasCaptchaComponent
            },
            button: {
              label: 'REDIGITE...',
              disabled: true
            }
          }
        })
      }
      Auth.authenticateUser(res.token)
      redirectToPrevUrl()
    })
  }
}

/**
 * Action para onChange
 *
 * @param {Event} event Evento onChange
 * @return {Function} Redux Thunk
 */
export function changeUser (eventOrCaptcha) {
  console.log('eventOrCaptcha', eventOrCaptcha)

  const target = eventOrCaptcha && eventOrCaptcha.target ? eventOrCaptcha.target : null
  const captchaValue = eventOrCaptcha && !eventOrCaptcha.target ? eventOrCaptcha : null

  const actionResult = {
    type: CHANGE_USER,
    payload: {
      input: {},
      captcha: {}
    }
  }

  /* Be one or another */
  if (target) actionResult.payload.input = target
  if (captchaValue) actionResult.payload.captcha.value = captchaValue

  return actionResult
}

/**
 * Action para onChangeCaptcha
 *
 * @param {Event} tokenCaptcha Evento onChange
 * @return {Function} Redux Thunk
 */
export function changeCaptcha (element) {
  return {
    type: CHANGE_CAPTCHA,
    payload: { captcha: { element } }
  }
}
