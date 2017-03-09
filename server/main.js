import express from 'express'
import log from 'debug'
import path from 'path'
import webpack from 'webpack'
import webpackConfig from '../config/webpack.config'
import project from '../config/project.config'
import compress from 'compression'
import bodyParser from 'body-parser'
import passport from 'passport'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import localSignupStrategy from './passport/local-signup'
import localLoginStrategy from './passport/local-login'

const debug = log('app:server')

const app = express()

// Apply gzip compression
app.use(compress())

// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }))

// pass the passport middleware
app.use(passport.initialize())

app.use(handleRender)

// We are going to fill these out in the sections to follow
function handleRender(req, res, next) { return next() }
function renderFullPage(html, preloadedState) { /* ... */ }


// load passport strategies
passport.use('local-signup', localSignupStrategy)
passport.use('local-login', localLoginStrategy)

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (project.env === 'development') {
  const compiler = webpack(webpackConfig)

  debug('Enabling webpack dev and HMR middleware')
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    // contentBase : [project.paths.client(), project.paths.server()],
    contentBase: project.paths.client(),
    hot: true,
    quiet: project.compiler_quiet,
    noInfo: project.compiler_quiet,
    lazy: false,
    stats: project.compiler_stats
  }))
  app.use(require('webpack-hot-middleware')(compiler, {
    path: '/__webpack_hmr'
  }))

  // Serve static assets from ~/public since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(express.static(project.paths.public()))

  // routes
  require('./modules/all-routes')(app)

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
}

export default app
