module.exports = (app) => {
  app.use('/api', require('./api/api'))

  app.use('/login', require('./auth/login'))
  app.use('/signup', require('./api/signup'))
  app.use('/forgot', require('./auth/forgot'))
  app.use('/reset', require('./api/reset'))
}
