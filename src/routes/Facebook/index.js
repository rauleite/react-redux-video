import { Facebook } from './components/Facebook'

export default Facebook

// import { injectReducer } from '../../store/reducers'

// export default (store) => ({
//   path : 'facebook',
//   /*  Async getComponent is only invoked when route matches   */
//   getComponent (nextState, cbReplace) {
//     /*  Webpack - use 'require.ensure' to create a split point
//         and embed an async module loader (jsonp) when bundling   */
//     require.ensure([], (require) => {
//       /*  Webpack - use require callback to define
//           dependencies for bundling   */

//       // dynamic imports
//       const Facebook = require('./containers/FacebookContainer').default
//       const reducer = require('./modules/facebook').default

//       /*  Add the reducer to the store on key 'facebook'  */
//       injectReducer(store, { key: 'facebook', reducer })

//       /*  Return getComponent   */
//       cbReplace(null, Facebook)

//     /* Webpack named bundle   */
//     }, 'facebook')
//   }
// })
