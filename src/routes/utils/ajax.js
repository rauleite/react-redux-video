/**
 * Faz requisicao ajax de usuario, no client
 * @param {string} path url path
 * @param {object} user User do Obj State
 * @param {function} callback Retorno do xhr 
 */
export function sendUser (path, userState, callback) {
  const user = userState.toJS()
  let formData = ``

  formData += user.name ? `name=${encodeURIComponent(user.name)}&` : ``
  formData += user.email ? `&email=${encodeURIComponent(user.email)}&` : ``
  formData += user.password ? `&password=${encodeURIComponent(user.password)}` : ``

  formData = formData.replace(/^\&/, '').replace(/\&\&/, '&').replace(/\&$/, '')

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
      callback(null, xhr.response)
    } else {
      const error = {
        erros: xhr.response.errors,
        message: xhr.response.message
      }
      callback(error, xhr.response)
    }

  })
  console.info(config.type, '->', config.path, config.data)
  xhr.send(config.data)
}
