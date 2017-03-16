import express from 'express'
import promisify from 'tiny-promisify'
import { doLogin } from './login'

const User = require('mongoose').model('User')
const router = new express.Router()

router.get('/:token', (req, res) => {
  
  (async () => {
    try {
      if (!req.params.token) {
        throw new Error('Erro Interno')
      }
      
      const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: {
          $gt: Date.now()
        }
      })
      
      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'A solicitação de alteração de senha expirou, favor solicitar novamente.',
          user: {
            token: req.params.token
          }
        })
      }

      const { name, email } = user.toObject()

      return res.status(200).json({
        success: true,
        message: 'Sucesso para aleração da senha.',
        user: {
          name,
          email,
          token: req.params.token
        }
      })
    } 
    catch (error) {
      console.error('error', error.stack)
      
      return res.status(400).json({
        success: false,
        message: 'Erro Interno'
      })
    }
  })()
})

router.post('/', (req, res, next) => {
  (async () => {
    try {
      const token = req.body.token ? req.body.token : undefined

      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
      })

      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'A solicitação de alteração de senha expirou, favor solicitar novamente.'
        })
      }

      user.password = req.body.password
      user.resetPasswordToken = undefined
      user.resetPasswordExpires = undefined

      const userResult = await user.save()

      const { name, email } = user.toObject()

      // return doLogin(req, res, next)

      return res.status(200).json({
        success: true,
        message: 'Sucesso para aleração da senha.',
        user: { name, email}
      })

    } catch(error) {
      console.error('error', error.stack)
      
      return res.status(400).json({
        success: false,
        message: 'Erro Interno'
      })
    }
  })()
})

export default router
// module.exports = router
