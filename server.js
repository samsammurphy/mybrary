if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

// routes
const indexRouter = require('./routes/index.js')

// views
app.set('view engine', 'ejs')
app.set('views', __dirname+'/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)

// static files
app.use(express.static('public'))

// MongoDB
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection

// check database connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Database connected'))



app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)
