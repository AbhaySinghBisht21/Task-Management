const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

mongoose.connect("mongodb://127.0.0.1:27017/taskmanager").then(() => {
  console.log("connected to mongodb");
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    limit: "100mb",
    extended: true,
    parameterLimit: 50000,
  })
);

const task = require("./routes/taskRoute");

app.use("/api", task);

app.use(express.static(path.join(__dirname, "../vite-project/build")));

app.listen(5000, () => {
  console.log("app is running in port ");
});
