import { combineReducers } from 'redux'
import locationReducer from './location'
import loginNavReducer from '../routes/Form/modules/loginReducers'
import signupHomeReducer from '../components/SignupHome/signupHomeReducers'

export const makeRootReducer = (asyncReducers) => {
  // console.log('reducers', asyncReducers)
  return combineReducers({
    location: locationReducer,
    /* login possui também o reducer da rota */
    login: loginNavReducer,
    signup: signupHomeReducer,
    // facebook: facebook,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
