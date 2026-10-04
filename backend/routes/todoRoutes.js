const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();


// POST - Create Todo
router.post("/", async (req, res) => {

    try {

        const todo = new Todo({
            task: req.body.task
        });

        const savedTodo = await todo.save();

        res.status(201).json(savedTodo);

    } catch (error) {

        res.status(500).json({
            message: "Error creating Todo"
        });

    }

});


// GET - Get all Todos
router.get("/", async (req, res) => {

    try {

        const todos = await Todo.find();

        res.json(todos);

    } catch (error) {

        res.status(500).json({
            message: "Error fetching Todos"
        });

    }

});


// PUT - Update Todo
router.put("/:id", async (req, res) => {

    try {

        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            {
                completed: req.body.completed
            },
            { new: true }
        );

        res.json(updatedTodo);

    } catch (error) {

        res.status(500).json({
            message: "Error updating Todo"
        });

    }

});


module.exports = router;
// DELETE - Delete Todo
router.delete("/:id", async (req, res) => {

    try {

        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

        res.json(deletedTodo);

    } catch (error) {

        res.status(500).json({
            message: "Error deleting Todo"
        });

    }

});