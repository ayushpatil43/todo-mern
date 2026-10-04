const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const todoRoutes = require("./routes/todoRoutes");

const app = express();
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Todo App Backend is Running!");
});

app.use("/api/todos", todoRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((error) => {
        console.log("MongoDB Connection Error:", error);
    });

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});