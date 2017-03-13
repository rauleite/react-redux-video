const express = require('express')
const User = require('mongoose').model('User')

const router = new express.Router()

router.get('/reset/:token', (req, res) => {
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() }
  },
  (err, user) => {
    if (err) {
      console.err('err', err.stack)
    }

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'O Token para reset da senha é inválido ou expirou.'
      })
    }

    res.render('reset', {
      user: req.user
    })
  })
})

module.exports = router
