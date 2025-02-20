const mongoose = require("mongoose")

const todoschema = mongoose.Schema({
    title:{type:String,required:true},
    desc:{type:String},
    duedate:{type:Date,required:true},
    plevel:{type:String,required:true},
    status:{type:String,required:true}
})

const Todo = mongoose.model("todo",todoschema)
module.exports = Todo