
const taskSchema = require("../Models/Todo")

const add = async(req,res)=>{
    const task = req.body.task;
    const todo = new taskSchema({
        task:task
    })
    try{
        await todo.save();
    }catch(e){
        return console.log(e);
    }
    if(!todo){
        return res.status(400).json({message:"Not added"})
    }
    return res.status(200).json({message:{todo}})
}

const getAllTodos = async(req,res)=>{
    let todos
    try{
        todos = await taskSchema.find()
    }catch(e){
        return console.log(e)
    }
    if(!todos){
        return res.status(404).json({message:"No todos found"})
    }
    return res.status(200).json({message:{todos}})
}

const getTodo = async(req,res)=>{
    let todo
    const id = req.params.id;
    try{
        todo = await taskSchema.findById(id)
    }catch(e){
        return console.log(e);
    }
    if(!todo){
        return res.status(400).json({message:"No todo found with that id"})
    }
    return res.status(200).json({message:{todo}})
}

const updateTodo = async (req, res) => {
    const id = req.params.id;
    const todo = await taskSchema.findById(id)
    try{
        const updateTodo = await taskSchema.findByIdAndUpdate(id,{done:!todo.done},{new:true})
        res.json(updateTodo)
    }catch(e){
        return console.log(e);
    }
};

const deleteTodo = async(req,res)=>{
    let todo;
    const id = req.params.id;
    try{
        todo = await taskSchema.findByIdAndDelete(id)
    }catch(e){
        return console.log(e);
    }
    if(!todo){
        return res.status(500).json({message:"Unable to delete"})
    }
    return res.status(200).json({message:"Deleted Successfully"})
}

const UpdateText = async(req,res)=>{
    const id = req.params.id;
    const {task} = req.body;
    let todo
    try{
        todo = await taskSchema.findByIdAndUpdate(id,{task},{new:true})
    }catch(e){
        return console.log(e);
    }
    if(!todo){
        return res.status(400).json({message:"Unable to update"})
    }
    return res.status(200).json({message:{todo}})
}

module.exports = {add,getAllTodos,getTodo,updateTodo,UpdateText,deleteTodo}
