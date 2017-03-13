import Auth from '../../modules/Auth'

/**
 * Previne acessos desnecessarios ao estar Autenticado
 * (Programacao Defensiva)
 * @param {object} prevState
 * @param {object} nextState
 * @param {function} replace
 */
export function previneAcessosAuth ({ location }, replace) {
  const pathSolicitado = location.pathname

  const pathsProibidos = ['/signup', '/login']
  const isPathProibido = pathsProibidos.includes(pathSolicitado)
  if (pathSolicitado === '/' || !isPathProibido || !Auth.isUserAuthenticated()) {
    return
  }

  console.log('pathSolicitado', pathSolicitado)
  console.log('isUrlProibido', isPathProibido)
  console.log('replacing...')

  replace('/')
  return
}

/**
 * Proibe determinados acessos sem autenticacao
 * @param {object} nextState
 * @param {function} replace
 */
export function proibeAcessosSemAuth ({ location }, replace) {
  const pathSolicitado = location.pathname

  const pathsProibidos = ['/dashboard']
  const isPathProibido = pathsProibidos.includes(pathSolicitado)

  console.log('1')
  if (pathSolicitado === '/' || !isPathProibido) {
    return
  }
  console.log('2')

  if (Auth.isUserAuthenticated()) {
    console.log('3')
    return
  } else {
    console.log('4')
    replace('/')
  }
}

/**
 * Persiste a ultima url quando entra na tela de login, para redirecionamento posterior
 * @param {object} prevState
 * @param {object} nextState
 * @param {function} replace
 * @param {function} callback
 */
export function persistPrevLoginUrl (prevState, nextState, replace) {
  const nextLocation = nextState.location
  const prevLocation = prevState.location

  const pathsAPersistir = ['/login', '/logout']

  if (!pathsAPersistir.includes(nextLocation.pathname)) {
    return
  }

  localStorage.setItem('urlPrevLogin', prevLocation.pathname + prevLocation.search)
}
