const express = require('express')
const port = process.env.PORT || 8080
const app = express()

app.use(express.static(__dirname + '/dist/'))
app.get(/.*/, function(req, res) {
  res.sendFile(__dirname + '/dist/index.html')
})
app.listen(port)

console.log(`App is listening on port: ${port}`)

// const env = process.env.NODE_ENV || 'development'

// var forceSsl = function(req, res, next) {
//   if (req.headers['x-forwarded-proto'] !== 'https') {
//     return res.redirect(['https://', req.get('Host'), req.url].join(''))
//   }
//   return next()
// }

// app.configure(function() {
//   if (env === 'production') {
//     app.use(forceSsl)
//   }
// })
