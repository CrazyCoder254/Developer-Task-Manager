const Task = require("../models/Task");

//POST api/tasks
exports.createTask = async(req, res)=>{
    const task = await Task.create({
        ...req.body, owner:req.User.id
    })
    res.json(task);
}
//Get api/tasks/me
exports.getMyTasks = async(req, res) => {
    const tasks = await Task.find({ owner: req.user.id})
    res.json(tasks);
}

exports.getAllTasks = async(req,res) => {
    const tasks = await Task.find().populate("owner", "email")
}