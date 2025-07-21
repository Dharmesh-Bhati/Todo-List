const express= require('express')
const app = express()
const mongoose = require('mongoose');
const cors = require('cors')
const todoRoutes = require('./routes/todoRoutes')
const dotenv = require('dotenv').config()

const PORT = process.env.PORT || 8000
app.use(express.json())
app.use(cors({
   origin: ["http://localhost:5173", "https://mern-todo-list-hfm7.onrender.com"]
}))

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected!'))
  .catch((err) => console.log(err.message))

app.use('/todo',todoRoutes)

app.get('/', (req, res) => {
  res.send('Server is running');
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});