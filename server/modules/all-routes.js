module.exports = (app) => {
  app.use('/auth', require('./auth/auth'))
  app.use('/api', require('./api/api'))
}
