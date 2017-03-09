import mongoose from 'mongoose'
import project from '../config/project.config'
import log from 'debug'

const debug = log('app:bin:dev-server')

export function connect (callback) {
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
