const project = require('../config/project.config')
const log = require('debug')
const connect = require('./mongo-connect')
let server = null

if (process.env === 'development') {
  server = require('../server/main')
} else {
  server = require('../dist-server/main')
}

const debug = log('app:bin:dev-server')

// nodemon({ script: 'bin/server' }).on('restart', () => {
//   console.log('restaraaart')
// })

connect(() => {
  server.listen(project.server_port)
  debug(`Server is now running at http://localhost:${project.server_port}.`)
})
