// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout'
import CounterRoute from './Counter'
import FacebookRoute from './Facebook'
import Home from './Home'
import LoginRoute from './Form/login'
import SignupRoute from './Form/signup'
import LogoutRoute from './Form/logout'
import ForgotRoute from './Form/forgot'
import ResetRoute from './Form/reset'
// import FacebookRoute from './Form/facebook'
import Dashboard from './Dashboard'

import {
  previneAcessosAuth,
  persistPrevLoginUrl,
  proibeAcessosSemAuth
} from './utils/hooks'

// PlainRoute objects
export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home,
  childRoutes: [
    CounterRoute(store),
    LoginRoute(store),
    SignupRoute(store),
    LogoutRoute(store),
    ForgotRoute(store),
    FacebookRoute(store),
    ResetRoute(store),
    { path: 'dashboard', component: Dashboard },
    { path: '*', component: Home }

  ],

  /**
   * Hook que é chamado quando entra na Aplicacao (uma vez)
   * @param {objects} nextState
   * @param {function} replace
   * @param {function} callback
   */
  onEnter (nextState, replace, callback) {
    previneAcessosAuth(nextState, replace)
    proibeAcessosSemAuth(nextState, replace)
    callback()
  },

  /**
   * Hook que é chamado sempre que uma rota filha é alterada
   * @param {objects} prevState
   * @param {objects} nextState
   * @param {function} replace
   * @param {function} callback
   */
  onChange (prevState, nextState, replace, callback) {
    previneAcessosAuth(nextState, replace)
    proibeAcessosSemAuth(nextState, replace)
    persistPrevLoginUrl(prevState, nextState, replace)
    callback()
  }
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
