/**
 * Faz requisicao ajax de usuario, no client
 * @param {string} path url path
 * @param {object} user User do Obj State
 * @param {function} callback Retorno do xhr 
 */
export function sendUser (path, user, callback) {
  let formData = ``

  formData += user.name ? `name=${encodeURIComponent(user.name)}&` : ``
  formData += user.email ? `&email=${encodeURIComponent(user.email)}&` : ``
  formData += user.password ? `&password=${encodeURIComponent(user.password)}` : ``

  formData = formData.replace(/^\&/, '').replace(/\&\&/, '&').replace(/\&$/, '')

  // create an AJAX request
  const xhr = new XMLHttpRequest()
  xhr.open('post', path)
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
  console.info('formData', formData)
  xhr.send(formData)
}
