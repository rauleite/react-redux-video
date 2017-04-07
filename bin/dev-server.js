const project = require('../config/project.config')
require('./env').load('../server/models/user')
const connectMongo = require('./mongo-connect')
const app = require('./env').load('../server/main')

// const https = require('https')
// const fs = require('fs')

const log = require('debug')
const debug = log('app:bin:dev-server')

// const options = {
//   cert: fs.readFileSync(project.ssl_cert),
//   key: fs.readFileSync(project.ssl_key)
// }

// const server = https.createServer(options, app)
connectMongo(() => {
  app.listen(project.server_port, (error) => {
    if (error) {
      console.error('Erro --> ', error)
      return
    }
    debug(`Server is now running at http://localhost:${project.server_port}.`)
  })
})
