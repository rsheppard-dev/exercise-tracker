const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config({ path: __dirname + '/config/.env' })
require('./db/mongoose')
const userRouter = require('./routers/user')
const exerciseRouter = require('./routers/exercise')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(userRouter, exerciseRouter)
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})