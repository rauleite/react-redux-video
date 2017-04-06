import { Map } from 'immutable'

/**
 * Faz requisicao ajax de usuario, no client
 * @param {string} path url path
 * @param {object} user User do Obj State
 * @param {function} callback Retorno do xhr
 */

export async function sendUser (path, data, callback) {
  console.info('--> POST', data)
  try {
    const options = {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(data)
    }
    const res = await fetch(path, options)
    const resThen = await res.json()
    console.info('res', resThen)

    let error = false

    if (!resThen.success) {
      console.error('Erro no retorno -- !resThen.success')
      error = {
        erros: resThen.errors,
        message: resThen.message
      }
      console.error('error', error)
    }

    return callback(error, resThen)
  } catch (error) {
    console.error('ERRO GRAVE:', error)
  }
}

export function sendUser2 (path, data, callback) {
  // /** Pra manter compatibilidade */
  if (Map.isMap(data)) {
    data = data.toJS()
  }

  let formData = ``
  for (let key in data) {
    if (!data.hasOwnProperty(key)) continue

    /* Se tiver só um level no obj */
    if (!(typeof data[key] === 'object')) {
      formData += data[key] ? `${key}=${encodeURIComponent(data[key])}&` : ``
      continue
    }

    for (let key2 in data[key]) {
      if (!data[key].hasOwnProperty(key2)) continue

      formData += data[key][key2] ? `${key2}=${encodeURIComponent(data[key][key2])}&` : ``
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
