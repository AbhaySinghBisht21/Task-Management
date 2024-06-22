const { log } = require("console");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const Task = require("../models/taskModel");

//Getting all tasks

exports.getAllTasks = catchAsyncErrors(async (req, res, next) => {
  const tasks = await Task.find();

  res.status(200).json({
    success: true,
    tasks,
  });
});

//Getting a task by id

exports.getSingleTask = catchAsyncErrors(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(("Task not found", 404));
  }

  res.status(200).json({
    success: true,
    task,
  });
});

//Creating a task

exports.createTask = catchAsyncErrors(async (req, res, next) => {
  const task = await Task.create(req.body);

  res.status(201).json({
    success: true,
    task,
  });
});

//Updating a task

exports.updateTask = catchAsyncErrors(async (req, res, next) => {
  const newTask = {
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
  };

  let task = await Task.findById(req.params.id);
  if (!task) {
    return next(new Error(`Task does not exist with id: ${req.params.id}`));
  }

  task = await Task.findByIdAndUpdate(req.params.id, newTask, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    task,
  });
});

//deleting a task

exports.deleteTask = catchAsyncErrors(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(new Error(`Task does not exist with id: ${req.params.id}`));
  }

  await task.deleteOne(task);

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
});
