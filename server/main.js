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
import redisClient from '../bin/redis-connect'

const debug = log('app:bin:dev-server')
const app = express()
const limiter = require('express-limiter')(app, redisClient)

/* Para uso de informacoes do proxy, como ler headers, para o limit-express */
app.enable('trust proxy', true)
app.enable('trust proxy', 'loopback')

// tell the app to parse HTTP body messages
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/* pass the passport middleware */
app.use(passport.initialize())

/* Esconde o termo: Express do cabeçalho */
app.disable('x-powered-by')

/* Max de 20 req por minuto - media de 1 req a cada 3 segundos */
limiter({
  path: '*',
  method: 'get',
  total: 20,
  expire: 1000 * 60,
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

app.use('*', (req, res, next) => {
  console.log('-------REQ HEADER---------')
  for (var key in req.headers) {
    if (req.headers.hasOwnProperty(key)) {
      var element = req.headers[key]
      console.log('req.headers.' + key, '-->', element)
    }
  }
  console.log('req.ip', '-->', req.ip)
  console.log('req.ips', '-->', req.ips)
  console.log('------- /FIM REQ HEADER---------')
  next()
})

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

  app.use(express.static(project.paths.dist()))

  // routes
  carregaRotas()
}

function carregaRotas () {
  return require('./modules/all-routes')(app)
}

// function limiteRequest () {
//   return (req, res, /*next*/) => {
//     console.error('WARNING GRAVE: Atingiu o limite de requests')
//     const message = 'A Página está temporariamente fora do ar, tente novamente mais tarde.'
//     const port = '429'
//     res.format({
//       html: function(){
//         res.status(port).end(message)
//       },
//       json: function(){
//         res.status(port).json(message)
//       }
//     })
//   }
// } 

module.exports = app
