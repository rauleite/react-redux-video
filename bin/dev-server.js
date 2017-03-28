const project = require('../config/project.config')
const log = require('debug')
const connect = require('./mongo-connect')
require('./env').load('../server/models/user')
const app = require('./env').load('../server/main')
// const https = require('https')
// const fs = require('fs')

const debug = log('app:bin:dev-server')

// const options = {
//   cert: fs.readFileSync(project.ssl_cert),
//   key: fs.readFileSync(project.ssl_key)
// }

// const server = https.createServer(options, app)

connect(() => {
  // server.listen(project.server_port)
  console.log('project.server_port', project.server_port)
  app.listen(project.server_port, (error) => {
    if (error) {
      console.log('project.server_port', project.server_port)
      console.log('Erro --> ', error)
      return
    }
    debug(`Server is now running at http://localhost:${project.server_port}.`)
  })
})
