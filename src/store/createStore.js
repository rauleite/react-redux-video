import { applyMiddleware, compose, createStore } from 'redux'

import { browserHistory } from 'react-router'
import makeRootReducer from './reducers'
import thunk from 'redux-thunk'
import { updateLocation } from './location'
import { persistPrevSignupUrl, authOrNotUrl } from './middleware'

export default (initialState = {}) => {
  const middleware = [
    thunk,
    persistPrevSignupUrl,
    authOrNotUrl
  ]

  // ======================================================
  // Store Enhancers (intensificadores; potencializadores)
  // ======================================================
  const enhancers = []

  let composeEnhancers = compose

  if (__DEV__) {
    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  store.asyncReducers = {}

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store))

  // console.log('** module.hot', module.hot)
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  console.log('store', store.getState())

  return store
}
