const express= require('express')
const app = express()
const mongoose = require('mongoose');
const cors = require('cors')
const todoRoutes = require('./routes/todoRoutes')
const dotenv = require('dotenv').config()

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected!'))
  .catch((err) => console.log(err.message))

app.use('/todo',todoRoutes)

app.listen(8080,()=>{
    console.log('Server is listening on port 8080');
    
})