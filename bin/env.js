module.exports.load = function (path) {
  let serverPath = process.env.NODE_ENV === 'production'
    ? 'dist-server'
    : 'server'

  return require(path.replace(/server/, serverPath))
}
