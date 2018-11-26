const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/todo");

const taskModel = mongoose.model("Task", {
  title: String,
  isDone: {
    default: false
  }
});

app.get("/", function(req, res) {
  taskModel.find().exec(function(err, tasks) {
    if (err) {
      return res.status(400).json({
        message: "an error as occured"
      });
    }
    return res.status(200).json(tasks);
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started");
});
