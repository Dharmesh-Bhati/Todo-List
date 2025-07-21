const express= require('express')
const app = express()
const mongoose = require('mongoose');
const cors = require('cors')
const todoRoutes = require('./routes/todoRoutes')
const dotenv = require('dotenv').config()

app.use(express.json())
app.use(cors({
   origin: ["http://localhost:5173", "https://mern-todo-list-hfm7.onrender.com"]
}))

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected!'))
  .catch((err) => console.log(err.message))

app.use('/todo',todoRoutes)

app.listen(8080,()=>{
    console.log('Server is listening on port 8080');
    
})