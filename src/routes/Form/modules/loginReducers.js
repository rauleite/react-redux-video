import { PROCESS_FORM, CHANGE_USER, LOCATION_CHANGE, CHANGE_CAPTCHA } from '../consts'
// import { deepFreeze } from '../../utils/dev-mode'
import { initialState2 } from './logic/utils/initialState'
import { changeUser } from './logic/loginLogic'
import { className } from './logic/utils/logicUtils'
import { Map } from 'immutable'

export default function loginReducer (state = initialState2, action) {
  // deepFreeze(state)
  console.info('loginReducer', action.type)
  if (action && action.payload) console.info('--- action.payload.captcha', action.payload.captcha)

  if (action.type === PROCESS_FORM) {
    const payload = action.payload
    const result = state.withMutations(state => {
      for (let key in payload) {
        if (payload.hasOwnProperty(key)) {
          if (payload[key]) {
            const stateKey = state.get(key)
            if (Map.isMap(stateKey)) {
              state.set(key, stateKey.concat(payload[key]))
              continue
            }
            state.set(key, payload[key])
          }
        }
      }
    })
    console.info('state updated', result.toJS())
    return result
  } else if (action.type === CHANGE_USER) {
    const result = changeUser(state, action)
    const resultState = state.withMutations(state => {
      for (var key in result) {
        if (result.hasOwnProperty(key)) {
          state.set(key, state.get(key).concat(result[key]))
        }
      }
    })
    console.info('state updated', resultState.toJS())

    return resultState
  } else if (action.type === CHANGE_CAPTCHA) {
    const currentCaptcha = action.payload.captcha

    if (currentCaptcha && currentCaptcha.element) {
      const result = state
        .setIn(['captcha', 'element'], currentCaptcha.element)
      console.info('state updated', result.toJS())
      return result
    }
    console.info('state NOT updated', state.toJS())
    return state
  } else if (action.type === LOCATION_CHANGE) {
    const successMessage = localStorage.getItem('successMessage')
    const email = localStorage.getItem('email')

    localStorage.removeItem('successMessage')
    localStorage.removeItem('email')

    if (!successMessage) {
      console.info('não há localStorage')
      return initialState2
    }

    let stateReturn = initialState2
      .setIn(['styles', 'infoMessage'], className.success)
      .setIn(['user', 'email'], email)
      .set('successMessage', successMessage)

    console.info('state', stateReturn.toJS())

    return stateReturn
  } else {
    return state
  }
}
