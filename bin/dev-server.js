import project from '../config/project.config'
import log from 'debug'
import { connect } from './mongo-connect'
import server from '../server/main'

const debug = log('app:bin:dev-server')

connect(() => {
  server.listen(project.server_port)
  debug(`Server is now running at http://localhost:${project.server_port}.`)
})
