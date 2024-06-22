const express = require("express");

const {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskControllers");

const router = express.Router();

router.route("/").get(getAllTasks);
router.route("/new").post(createTask);
router.route("/tasks/:id").get(getSingleTask);
router.route("/edit/:id").put(updateTask);
router.route("/delete/:id").delete(deleteTask);

module.exports = router;
