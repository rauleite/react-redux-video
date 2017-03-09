import Auth from '../../../modules/Auth'
import { redirectToPrevUrl } from '../../utils/url'

export default (store) => ({
  path: 'logout',
  onEnter: (nextState, replace) => {
    Auth.deauthenticateUser()
    redirectToPrevUrl()
  }
})
