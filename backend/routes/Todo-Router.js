const express = require('express')
const {add,getAllTodos,getTodo,updateTodo,deleteTodo, UpdateText} = require('../controller/Todo-Controller')
const router = express.Router()

router.post("/add",add)
router.get("/",getAllTodos)
router.get("/:id",getTodo)
router.put("/:id",updateTodo)
router.put("/update/:id",UpdateText)
router.delete("/:id",deleteTodo)


module.exports = router