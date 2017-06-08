const mongoose = require('mongoose')
const project = require('../config/project.config')
const log = require('debug')

const debug = log('app:bin:dev-server')

module.exports = function connect (callback) {
  // connect to the database and load models
  let db_uri = `mongodb://${project.mongo_user}:${project.mongo_password}@${project.mongo_path}/${project.mongo_db}`

  mongoose.connect(db_uri)

  // plug in the promise library:
  mongoose.Promise = global.Promise

  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`)
    process.exit(1)
  })

  mongoose.connection.on('connected', (err) => {
    if (err) {
      throw new Error('Erro de Conexão')
    }

    // load models
    debug(`Mongoose default connection open to ${project.db_uri}`)

    if (callback && typeof callback === 'function') {
      callback()
    }
  })
}
