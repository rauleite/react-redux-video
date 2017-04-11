import 'babel-polyfill'
import express from 'express'
import log from 'debug'
import path from 'path'
import webpack from 'webpack'
import webpackConfig from '../config/webpack.config'
import project from '../config/project.config'
import bodyParser from 'body-parser'
import passport from 'passport'
import localSignupStrategy from './passport/local-signup'
import localLoginStrategy from './passport/local-login'

const debug = log('app:bin:dev-server')
const app = express()

/* Para uso de informacoes do proxy, como ler headers, para o limit-express */
app.enable('trust proxy', true)
app.enable('trust proxy', 'loopback')

// tell the app to parse HTTP body messages
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/* pass the passport middleware */
app.use(passport.initialize())

// app.use('*', (req, res, next) => {
//   console.log('-------REQ HEADER---------')
//   for (var key in req.headers) {
//     if (req.headers.hasOwnProperty(key)) {
//       var element = req.headers[key]
//       console.log('req.headers.' + key, '-->', element)
//     }
//   }
//   console.log('req.ip', '-->', req.ip)
//   console.log('req.ips', '-->', req.ips)
//   console.log('------- /FIM REQ HEADER---------')
//   next()
// })

/* load passport strategies */
passport.use('local-signup', localSignupStrategy)
passport.use('local-login', localLoginStrategy)

/* load models */
require('./models/user')
require('./models/captcha')

if (project.env === 'development') {
  const compiler = webpack(webpackConfig)

  debug('Enabling webpack dev and HMR middleware')

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: project.paths.client(),
    hot: true,
    quiet: project.compiler_quiet,
    noInfo: project.compiler_quiet,
    lazy: false,
    stats: project.compiler_stats
  }))
  // }
  app.use(require('webpack-hot-middleware')(compiler, {
    path: '/__webpack_hmr'
  }))

  // Serve static assets from ~/public since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.

  app.use(express.static(project.paths.public()))

  // routes
  carregaRotas()

  // This rewrites all routes requests to the root /index.html file
  // (ignoring file requests). If you want to implement universal
  // rendering, you'll want to remove this middleware.
  app.use('*', function (req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.html')
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  })
} else {
  debug(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  )
  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  
  /* Esconde o termo: Express do cabeçalho */
  app.disable('x-powered-by')

  const redisClient = require('../bin/redis-connect')
  const limiter = require('express-limiter')(app, redisClient)
  
  /* Prevent's DDOs attack */

  /* Max de 75 req por 5 minutos - media de 1 req a cada 4 segundos */
  limiter({
    path: '*',
    method: 'all',
    total: 75,
    expire: 1000 * 60 * 5,
    lookup: 'ip',
  })

  /* Max de 1 req a cada 3 segundos */
  limiter({
    path: '*',
    method: 'post',
    total: 1,
    expire: 1000 * 2,
    lookup: 'ip',
  })

  app.use(express.static(project.paths.dist()))

  // routes
  carregaRotas()
}

function carregaRotas () {
  return require('./modules/all-routes')(app)
}

module.exports = app
