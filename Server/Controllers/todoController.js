const Todo = require("../models/todoSchema");
const mongoose = require("mongoose");

const createTodo = async (req, res) => {
  // console.log(req.user.id);
  try {
    const { todoTitle, todoTask } = req.body;
    // const id = 1;
    const currDate = Date.now();

    if (!todoTitle || !todoTask) {
      throw new error("Please enter the Title");
    }
    const Todos = await Todo.create({
      userId: req.user.id,
      title: todoTitle,
      task: [
        {
          _id: mongoose.Types.ObjectId(),
          taskItem: todoTask,
          creeateDate: currDate,
        },
      ],
    });
    res.status(201).json({
      Success: true,
      message: "Todo created successfully",
      Todos,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

const getTodo = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized",
    });
  }
  const findTodo = await Todo.find({ userId: req.user.id })
    .then((data) => {
      return res.status(201).json({
        success: true,
        data,
      });
    })
    .catch((error) => {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    });
};

const addTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { todoTask } = req.body;
    const mDate = Date.now();

    if (!id) throw new error("Please pass the Id");

    if (!todoTask) throw new error("Please enter the task");

    // const getSize = await Todo.findById({ _id: id });

    const updateTasks = await Todo.findByIdAndUpdate(
      { _id: id },
      {
        $push: {
          task: {
            _id: mongoose.Types.ObjectId(),
            taskItem: todoTask,
            creeateDate: mDate,
          },
        },
      },
      { new: true }
    );
    res.status(201).json({
      success: true,
      updateTasks,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

const editTask = async (req, res) => {
  try {
    const { todoTask } = req.body;
    const { id, taskId } = req.params;
    const mDate = Date.now();

    if (!id || !taskId || !todoTask)
      throw new error("Error in value, Please enter all the required values");

    const editTasks = await Todo.findOneAndUpdate(
      { _id: id, "task._id": taskId },
      {
        $set: {
          "task.$.taskItem": todoTask,
          "task.$.modifiedDate": mDate,
        },
      },
      { new: true }
    );
    res.status(201).json({ success: true, editTasks });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const updateTodos = await Todo.findByIdAndUpdate(
      { _id: id },
      { title: req.body.todoTitle }
    );
    res.status(201).json({
      success: true,
      updateTodos,
    });
  } catch (error) {
    res.status(401).json({
      success: fail,
      message: error.message,
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteTodos = await Todo.findByIdAndDelete({ _id: id });

    res.status(201).json({
      success: true,
      deleteTodos,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id, taskId } = req.params;
    const deleteTasks = await Todo.findOneAndUpdate(
      { _id: id },
      { $pull: { task: { _id: taskId } } },
      { new: true }
    );
    res.status(201).json({
      success: true,
      deleteTasks,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getTodo,
  createTodo,
  addTask,
  editTask,
  updateTodo,
  deleteTodo,
  deleteTask,
};
