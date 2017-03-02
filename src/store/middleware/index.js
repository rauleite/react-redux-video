import { isEmpty } from 'lodash'
import { LOCATION_CHANGE } from '../../routes/Form/consts'
import Auth from '../../modules/Auth'

/**
 * Persiste no localStorage url que acessou a tela de login
 * 
 * @param {object} store
 * @param {object} next
 * @param {object} action
 * @return {object} next()
 */
export const persistPrevSignupUrl = store => next => action => {
  const prevLocation = store.getState().location
  let prevPath = ''
  let prevSearch = ''

  if (action.type !== LOCATION_CHANGE) {
    return next(action)
  }

  if (!isEmpty(prevLocation)) {
    prevPath = prevLocation.pathname
    prevSearch = prevLocation.search
  }

  if (isOnLoginEnter(action) && prevPath) {
    localStorage.setItem('urlPrevLogin', prevPath + prevSearch)
  } else {
    localStorage.removeItem('urlPrevLogin')
  }

  return next(action)
}

/**
 * Verifica se está entrando na tela de login
 * 
 * @param {object} action 
 * @return {boolean}
 */
function isOnLoginEnter (action) {
  return (
    action.payload.action === 'PUSH' &&
    action.payload.pathname === '/login'
  )
}

/**
 * Autoriza ou não o acesso à certas rotas
 * 
 * @param {object} store
 * @param {object} next
 * @param {object} action
 * @return {object} next()
 */
export const authOrNotUrl = store => next => action => {
  console.log('authOrNotUrl store', store)
  console.log('authOrNotUrl action', action)

  if (!Auth.isUserAuthenticated()) {
    console.log('isUserAuthenticated', true)
    return next(action)
  }
  console.log('isUserAuthenticated', false)

  return next(action)
}

export const authXXX = (store, action) => {
  console.log('authOrNotUrl store', store)
  console.log('authOrNotUrl action', action)

  if (!Auth.isUserAuthenticated()) {
    console.log('isUserAuthenticated', true)
    return
  }
  console.log('isUserAuthenticated', false)
} 