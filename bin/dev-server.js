const project = require('../config/project.config')
const debug = require('debug')('app:bin:dev-server')
const mongoose = require('mongoose')

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
  require('../server/models/user')
  debug(`Mongoose default connection open to ${project.db_uri}`)
  connectServer()
})

function connectServer () {
  const server = require('../server/main')
  server.listen(project.server_port)
  debug(`Server is now running at http://localhost:${project.server_port}.`)
}
