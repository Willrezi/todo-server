const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/todo",
  { useNewUrlParser: true, useCreateIndex: true }
);

const TaskModel = mongoose.model("Task", {
  title: String,
  isDone: {
    type: Boolean,
    default: false
  }
});

app.get("/", (req, res) => {
  TaskModel.find().exec((err, tasks) => {
    /// .find() récupère toutes les taches
    if (err) {
      return res.status(400).json({
        error: err.message
      });
    }
    return res.status(200).json(tasks);
  });
});

app.post("/create", (req, res) => {
  const newTask = new TaskModel({ title: req.body.title });
  console.log(req.body);
  newTask.save((err, createdTask) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(200).json(createdTask);
    }
  });
});

app.post("/update", (req, res) => {
  TaskModel.findById(req.body.id).exec((err, task) => {
    if (err) {
      return res.status(400).json({
        error: err.message
      });
    }
    task.isDone = !task.isDone;
    task.save((err, updatedTask) => {
      return res.json({ message: "La liste a été updatée" });
    });
  });
});

app.post("/delete", (req, res) => {
  if (req.body.id) {
    TaskModel.deleteOne({ _id: req.body.id }).exec((err, task) => {
      if (err) {
        return res.status(400).json({
          error: err.message
        });
      }
      return res.json({ message: "La tâche a été supprimée" });
    });
  } else {
    return res.status(400).json({ error: err.message });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
