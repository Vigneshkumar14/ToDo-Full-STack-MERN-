const express = require("express");
const router = express.Router();
const {
  createTodo,
  addTask,
  updateTodo,
  deleteTodo,
  deleteTask,
  editTask,
  getTodo,
} = require("../Controllers/todoController");
const { login, signUp, logout } = require("../Controllers/userController");
const auth = require("../middleware/auth");

router.post("/signup", signUp);
router.post("/signin", login);
router.get("/signout", auth, logout);
router.get("/getTodo", auth, getTodo);
router.post("/create", auth, createTodo);
router.put("/updateTask/:id", auth, addTask);
router.put("/editTask/:id/:taskId", auth, editTask);
router.put("/updateTodo/:id", auth, updateTodo);
router.delete("/deleteTodo/:id", auth, deleteTodo);
router.delete("/deleteTask/:id/:taskId", auth, deleteTask);

module.exports = router;
