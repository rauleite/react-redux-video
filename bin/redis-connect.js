const redis = require('redis')
const log = require('debug')
const Promise = require('bluebird')

/* Promisify methods */
Promise.promisifyAll(redis)

const debug = log('app:bin:dev-server')

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || '172.17.0.3'
})

redisClient.on('connect', () => {
  debug(`Redis connection open`)
})

module.exports = redisClient
