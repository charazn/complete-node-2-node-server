const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const fs = require('fs')
const port = process.env.PORT || 3000

hbs.registerPartials(path.join(__dirname, '/views/partials'))
app.set('view engine', 'hbs')

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('capitalize', (text) => {
  return text.toUpperCase()
})

app.use((req, res, next) => {
  var now = new Date().toString()
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log)

  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server log')
    }
  })
  next()
})

// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// })

app.use(express.static(path.join(__dirname, '/public'))) // Using path.resolve(__dirname, '/public') does not work

app.get('/', (req, res) => {
  res.render('index.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'This is a bad page'
  })
})

app.listen(port, () => console.log(`Example app listening on port: ${port}`))
