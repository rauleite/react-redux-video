/**
 * Faz requisicao ajax de usuario, no client
 * @param {string} path url path
 * @param {object} user User do Obj State
 * @param {function} callback Retorno do xhr
 */
export function sendUser (path, userState, callback) {
  let user
  /** Pra manter compatibilidade */
  if (typeof userState.toJS === 'function') {
    user = userState.toJS()
  }
  user = userState

  let formData = ``

  for (var key in user) {
    if (user.hasOwnProperty(key)) {
      formData += user[key] ? `${key}=${encodeURIComponent(user[key])}&` : ``
    }
  }

  formData = formData.replace(/^&/, '').replace(/&&/, '&').replace(/&$/, '')

  console.info('formData', formData)

  const config = {
    type: 'POST',
    path: path,
    data: formData
  }

  send(config, callback)
}

export function send (config, callback) {
  config = {
    path: config.path ? config.path : undefined,
    type: config.type ? config.type : 'GET',
    data: config.data ? config.data : null
  }

  // create an AJAX request
  const xhr = new XMLHttpRequest()
  xhr.open(config.type, config.path)
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  xhr.responseType = 'json'
  xhr.addEventListener('load', () => {
    console.log('xhr.status', xhr.status)
    if (xhr.status === 200) {
      console.info('sucesso', xhr.response)
      callback(null, xhr.response)
    } else {
      const error = {
        erros: xhr.response.errors,
        message: xhr.response.message
      }
      console.error('error', error)
      callback(error, xhr.response)
    }
  })
  console.info(config.type, '->', config.path, config.data)
  xhr.send(config.data)
}
