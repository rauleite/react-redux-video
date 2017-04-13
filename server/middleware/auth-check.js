import { verifyAuthentication } from '../utils'

/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
  // get the last part from a authorization header string like "bearer token-value"
  return (async () => {
    if (!req.headers.authorization) {
      return res.status(401).end()
    }
    console.log('1')
    console.log('2')

    try {
      const token = req.headers.authorization.split(' ')[1]
      const user = await verifyAuthentication(token)
      console.log('3')

      if (!user) {
        console.log('A')
        return res.status(401).end()
      }
      console.info('USSER', user)

      return next()
    } catch (error) {
      console.log('ERRO GRAVE:', err)
      return res.status(401).end()
    }
  })()
  // decode the token using a secret key-phrase
  // return jwt.verify(token, config.jwt_secret, (err, decoded) => {
  //   // the 401 code is for unauthorized status
  //   if (err) {
  //   }

  //   const userId = decoded.sub

  //   // check if a user exists
  //   return User.findById(userId, (userErr, user) => {
  //     console.info('user.validToken', user.validToken)
  //     console.info('token', token)
  //     console.info('user.validToken !== token', user.validToken !== token)

  //     if (userErr || !user || user.validToken !== token) {
  //       return res.status(401).end()
  //     }

  //     return next()
  //   })
  // })
}
