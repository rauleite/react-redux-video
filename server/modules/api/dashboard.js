import express from 'express'

const router = new express.Router()

router.get('/dashboard', (req, res) => {
  console.log('4')

  console.log('GET --> dashboard req.body', req.body)
  res.status(200).json({
    message: "You're authorized to see this secret message."
  })
})

module.exports = router
