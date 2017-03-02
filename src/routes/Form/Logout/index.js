import { injectReducer } from '../../../store/reducers'
import Auth from '../../../modules/Auth'

export default (store) => ({
  path: 'logout',
  onEnter: (nextState, replace) => {
    Auth.deauthenticateUser()

    // change the current URL to /
    replace('/')
  }
})
