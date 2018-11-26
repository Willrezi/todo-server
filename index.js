const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/todo");

app.get("/", function(req, res) {
  res.json({ message: "Hello API" });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started");
});
