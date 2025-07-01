const express = require("express")
const { createTask, getMyTasks, getAllTasks } = require("../controllers/taskController")
const {protect, authorize} = require("../middleware/auth");
const router = express.Router();

router.post("/", protect, createTask);
router.get("/me", protect, getMyTasks);
router.get("/all", protect, authorize(["admin"]), getAllTasks);

module.exports = router;

