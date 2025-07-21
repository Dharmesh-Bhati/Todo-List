const express= require('express')
const router = express.Router()
const Todo = require('../model/TodoModel')


router.get('/',async(req,res)=>{
    try{
        const todos= await Todo.find()
        res.status(200).json(todos)
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
})

router.post('/',async (req,res) => {
    try{
        const {title} = req.body
        const newTodo = await new Todo ({title})
        const saveTodo = newTodo.save()
        res.status(201).json(saveTodo)
    } 
    catch(err){
        res.status(401).json({message:err.message})
    }
})

router.put('/:id',async (req,res) => {
    try{
        const {id} = req.params;
        const {title} = req.body
        const updateTodos = await Todo.findByIdAndUpdate(id,{title},{new:true})
        res.status(203).json(updateTodos)
    }
    catch(err){
        res.status(401).json({message:err.message})
    }
})

router.delete('/:id', async(req,res) => {
    try{
        const {id} = req.params;
        const deleteTodo = await Todo.findByIdAndDelete(id)
        res.status(202).json(deleteTodo)
    }
    catch(err){
        res.status(403).json({message: err.message})
    }
})

module.exports = router