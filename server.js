const express = require('express')
const port = process.env.PORT || 8080
const env = process.env.NODE_ENV || 'development'
const app = express()

app.use(express.static(__dirname + '/dist/'))
app.get(/.*/, function(req, res) {
  res.sendFile(__dirname + '/dist/index.html')
})

var forceSsl = function(req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''))
  }
  return next()
}

app.configure(function() {
  if (env === 'production') {
    app.use(forceSsl)
  }
})

app.listen(port)

console.log(`App is listening on port: ${port}`)
