const project = require('../config/project.config')
require('./env').load('../server/models/user')
const connectMongo = require('./mongo-connect')
const redisClient = require('./redis-connect')
const expressLimiter = require('express-limiter')
const app = require('./env').load('../server/main')
const limiter = expressLimiter(app, redisClient)

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
  /* Limit requests to 100 per hour per ip address. */
  limiter({
    lookup: ['connection.remoteAddress'],
    total: 100,
    expire: 1000 * 60 * 60
  })

  app.listen(project.server_port, (error) => {
    if (error) {
      console.error('Erro --> ', error)
      return
    }
    debug(`Server is now running at http://localhost:${project.server_port}.`)
  })
})
