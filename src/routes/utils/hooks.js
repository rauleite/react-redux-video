import Auth from '../../modules/Auth'

/**
 * Previne acessos desnecessarios ao estar Autenticado
 * (Programacao Defensiva)
 * @param {object} prevState
 * @param {object} nextState
 * @param {function} replace
 * @param {function} callback
 * @return {object} callback()
 */
export function previneAcessosAuth ({ location }, replace, callback) {
  const urlSolicitada = location.pathname

  const pathsProibidos = ['/signup', '/login']
  const isUrlProibido = pathsProibidos.includes(urlSolicitada)

  if (urlSolicitada === '/' || !isUrlProibido || !Auth.isUserAuthenticated()) {
    return callback()
  }

  console.log('urlSolicitada', urlSolicitada)
  console.log('isUrlProibido', isUrlProibido)
  console.log('replacing...')

  replace('/')
  return callback()
}

export function proibeAcessosSemAuth({ location }, replace, callback) {
  const urlSolicitada = location.pathname

  const pathsProibidos = ['/dashboard']
  const isUrlProibido = pathsProibidos.includes(urlSolicitada)

}

/**
 * Persiste a ultima url quando entra na tela de login, para redirecionamento posterior
 * @param {object} prevState 
 * @param {object} nextState 
 * @param {function} replace 
 * @param {function} callback 
 */
export function persistPrevLoginUrl (prevState, nextState, replace, callback) {
  const nextLocation = nextState.location
  const prevLocation = prevState.location

  if (nextLocation.pathname !== '/login') {
    return callback()
  }

  localStorage.setItem('urlPrevLogin', prevLocation.pathname + prevLocation.search)
  return callback()
}
