const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/todo");

const TaskModel = mongoose.model("Task", {
  title: String
});

app.get("/", (req, res) => {
  TaskModel.find().exec((err, tasks) => {
    if (err) {
      return res.status(400).json({
        error: err.message
      });
    }
    return res.status(200).json(tasks);
  });
});

app.post("/create", (req, res) => {
  const newTask = new TaskModel(req.body);
  console.log(req.body);
  newTask.save((err, createdTask) => {
    if (err) {
      res.json({ error: err.message });
    } else {
      res.json(createdTask);
    }
  });
});

app.post("/update", (req, res) => {});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
