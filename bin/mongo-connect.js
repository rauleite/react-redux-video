const mongoose = require('mongoose')
const project = require('../config/project.config')
const log = require('debug')

const debug = log('app:bin:dev-server')

module.exports = function connect (callback) {
  // connect to the database and load models
  mongoose.connect(project.db_uri)

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

    if (callback) {
      callback()
    }
  })
}
