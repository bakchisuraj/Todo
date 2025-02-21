const express = require("express")
const mongoose =require("mongoose")
const Todo = require("./todo.model")
const   cors = require("cors")
require("dotenv").config()
const port = process.env.port
const mongodb =process.env.mongodb
const app = express()
app.use(cors())
app.use(express.json())

app.listen(port,()=>{
    console.log("[server] server is running in port 3000")
    connectdb()
})

async function connectdb (){
    try{
        await mongoose.connect(mongodb)
        console.log("mongodb is connected")

    }
    catch(err){
        console.log("there is a error",err)
    }
}

app.get("/",(req,res)=>{
    res.send("welcome to the todo page")
})

app.post("/create",async(req,res)=>{
    const {title,desc,duedate,plevel,status}=req.body
    const todo = await Todo.create({
        title,
        desc,
        duedate,
        plevel,
        status,
    })
    res.send({
        message:"todo created",
        todo,
    })


})

app.get("/show",async(req,res)=>{
    const todos = await Todo.find({})
    res.send({
        message:"this are all todo",
        todos,
    })

})

app.delete("/todos/:id",async (req,res)=>{
    const todo = await Todo.findByIdAndDelete(req.params.id)
    res.send({
        message:"todo deleted",
        todo,
    })
})

app.patch("/todos/:id",async(req,res)=>{
    const todo = await Todo.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    })
    res.send({
        message:"todo updated",
        todo,
    })
})