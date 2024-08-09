const express=require('express')
const router = require('./routes/Todo-Router')
const mongoose=require('mongoose')
const cors=require('cors')
require('dotenv').config();

const app=express()
app.use(cors())
app.use(express.json())

app.use("/",router)


mongoose.connect(process.env.URL).then(()=>console.log("connected successfully"))



app.listen(3001,()=>{
    console.log("server is running")
})
