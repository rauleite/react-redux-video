import { isEmpty } from 'lodash'
import { send } from '../../utils/ajax'

export default (store) => ({
  path: 'reset/:token',
  onEnter: (nextState, replace) => {
    let isPathAndTokenOk = () => (
      nextState &&
      nextState.params &&
      !isEmpty(nextState.params.token) &&
      nextState.location &&
      nextState.location.pathname
    )

    if (isPathAndTokenOk()) {
      send({ path: `/auth${nextState.location.pathname}` }, (err, resp) => {
        if (err) {
          console.error('erro na resposta', err)
          return
        }
        console.log('resp', resp)
      })
    }
    // Auth.deauthenticateUser()
    // redirectToPrevUrl()
  }
})
