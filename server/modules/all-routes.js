import login from './auth/login'
import signup from './auth/signup'
import forgot from './auth/forgot'
import reset from './auth/reset'

module.exports = (app) => {
  app.use('/api', require('./api/api'))

  app.use('/auth/login', login)
  app.use('/auth/signup', signup)
  app.use('/auth/forgot', forgot)
  app.use('/auth/reset', reset)
}
