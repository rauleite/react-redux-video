const jwt = require('jsonwebtoken')
const User = require('mongoose').model('User')
const PassportLocalStrategy = require('passport-local').Strategy
const config = require('../../config/project.config')

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim()
  }

  // find a user by email address
  return User.findOne({ email: userData.email }, (err, user) => {
    if (err) {
      console.log('Erro Base', err.stack)
      return done(err)
    }

    if (!user) {
      const error = new Error('Você digitou login ou senha errado')
      error.name = 'IncorrectCredentialsError'

      return done(error)
    }

    // check if a hashed user's password is equal to a value saved in the database
    return user.comparePassword(userData.password, (passwordErr, isMatch) => {
      if (err) {
        return done(err)
      }

      if (!isMatch) {
        const error = new Error('Email ou senha incorreto')
        error.name = 'IncorrectCredentialsError'

        return done(error)
      }
      // exp: 5 dias
      const payload = {
        sub: user._id
      }
// 1488480670
// 1488480904
      // create a token string
      const token = jwt.sign(payload, config.jwt_secret, { expiresIn: '5s' })
      const data = {
        name: user.name
      }

      return done(null, token, data)
    })
  })
})
