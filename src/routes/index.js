// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout'
import CounterRoute from './Counter'
import Home from './Home'
import LoginRoute from './Form/Login'
import SignupRoute from './Form/Signup'
import LogoutRoute from './Form/Logout'

// PlainRoute objects
export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home,
  childRoutes: [
    CounterRoute(store),
    LoginRoute(store),
    SignupRoute(store),
    LogoutRoute(store)
  ]
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
