import jwt from 'jsonwebtoken'
import config from '../../config/project.config'
import { getDateNowFormartNormalizer } from '../utils'
const User = require('mongoose').model('User')
// const Token = require('mongoose').model('Token')
const PassportLocalStrategy = require('passport-local').Strategy

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
        const error = new Error('Você digitou login ou senha errado')
        error.name = 'IncorrectCredentialsError'

        return done(error)
      }

      /* 7 dias */
      const timeExpires = 60 * 60 * 24 * 7
      // const timeExpires = 60

      // create a token string
      const token = jwt.sign(
        { sub: user._id },
        config.jwt_secret,
        { expiresIn: timeExpires }
      )

      user.validToken = token
      user.validTokenExpires = getDateNowFormartNormalizer(timeExpires)
      user.save(error => {
        if (error) {
          console.error('ERRO GRAVE: - token.validToken', error)
          return done(error)
        }
      })

      return done(null, token, { name: user.name })
    })
  })
})
