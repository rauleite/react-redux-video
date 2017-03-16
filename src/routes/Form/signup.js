import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'signup',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cbReplace) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */

      // dynamic imports
      const Login = require('./containers/SingupContainer').default
      const reducer = require('./modules/signupReducers').default

      /*  Add the reducer to the store on key 'login'  */
      injectReducer(store, { key: 'signup', reducer })

      /*  Return getComponent   */
      cbReplace(null, Login)

    /* Webpack named bundle   */
    }, 'signup')
  }
})
