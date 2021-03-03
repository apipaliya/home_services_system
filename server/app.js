const express = require('express')
const app = express()
const mongoose = require('mongoose')
// const PORT = 8000
const PORT = process.env.PORT || 8000
const {MONGOURI} =  require('./config/keys')
require('./models/user')
require('./models/userpro')
require('./models/admin')

app.use(express.json())
app.use(require('./routes/auth'))
app.use("/email",require('./routes/email'))

mongoose.connect(MONGOURI,{
    useUnifiedTopology:true,
    useNewUrlParser:true
})
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo")
})
mongoose.connection.on('error',(err)=>{
    console.log("err to connect ",err)
})

const customMiddleware = (req,res,next) =>{
    console.log("middleware executed!!")
    next()
}

app.use(customMiddleware)

app.get('/',(req,res) => {
    res.send("hello world")
})


// if(process.env.NODE_ENV=="production"){
//     app.use(express.static('client/build'))
//     const path = require('path')
//     app.get("*",(req,res)=>{
//         res.sendFile(path.resolve(__dirname,'client','build','index.html'))
//     })
// }
app.listen(PORT , ()=> {
    console.log("Server is running on ",PORT)

})