import { useEffect, useState } from "react";
import "./App.css";

function App() {

    const [task, setTask] = useState("");
    const [todos, setTodos] = useState([]);

    const getTodos = async () => {
        const response = await fetch("http://localhost:5000/api/todos");
        const data = await response.json();
        setTodos(data);
    };

    useEffect(() => {
        getTodos();
    }, []);

    const addTodo = async () => {

        if (task.trim() === "") {
            return;
        }

        const response = await fetch("http://localhost:5000/api/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                task: task
            })
        });

        const data = await response.json();

        console.log(data);

        setTask("");
        getTodos();
    };

    const updateTodo = async (id, completed) => {

        const response = await fetch(
            `http://localhost:5000/api/todos/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    completed: !completed
                })
            }
        );

        const data = await response.json();

        console.log(data);

        getTodos();
    };

    const deleteTodo = async (id) => {

        const response = await fetch(
            `http://localhost:5000/api/todos/${id}`,
            {
                method: "DELETE"
            }
        );

        const data = await response.json();

        console.log(data);

        getTodos();
    };

    return (
        <div className="app">

            <div className="todo-container">

                <h1>My Todo App</h1>

                <div className="input-section">

                    <input
                        type="text"
                        placeholder="Enter a task"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                    />

                    <button className="add-btn" onClick={addTodo}>
                        Add
                    </button>

                </div>

                <h2>My Todos</h2>

                <ul>

                    {todos.map((todo) => (

                        <li
                            key={todo._id}
                            className={todo.completed ? "completed" : ""}
                        >

                            <span>{todo.task}</span>

                            <div className="buttons">

                                <button
                                    className="complete-btn"
                                    onClick={() =>
                                        updateTodo(todo._id, todo.completed)
                                    }
                                >
                                    {todo.completed ? "Undo" : "Complete"}
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() =>
                                        deleteTodo(todo._id)
                                    }
                                >
                                    Delete
                                </button>

                            </div>

                        </li>

                    ))}

                </ul>

            </div>

        </div>
    );
}

export default App;