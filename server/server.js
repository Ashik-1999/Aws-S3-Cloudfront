const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const postRoute = require('./routes/post')

const app = express()
app.use(cors())
require('dotenv').config()
const port = process.env.PORT || 4000

const url = 'mongodb://localhost:27017/s3bucket'
mongoose.connect(url).then(() => console.log("Database Connected"))
.catch(err => console.log(err))


app.use('/posts', postRoute)  

app.listen(port, () => console.log(`Listening on Port ${port}` ))