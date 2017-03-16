const project = require('../config/project.config')
const log = require('debug')
const connect = require('./mongo-connect')
require('./env').load('../server/models/user')
const server = require('./env').load('../server/main')

const debug = log('app:bin:dev-server')

connect(() => {
  server.listen(project.server_port)
  debug(`Server is now running at http://localhost:${project.server_port}.`)
})
