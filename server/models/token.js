import mongoose from 'mongoose'

// define the User model schema
const TokenSchema = new mongoose.Schema({
  blacklist: {
    type: String,
    index: { unique: true }
  }
})

module.exports = mongoose.model('Captcha', TokenSchema)
