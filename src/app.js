const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const path = require("path");

const app = express();

const publicDirectory = path.join(__dirname, "../");
console.log(publicDirectory);

app.use(express.static(publicDirectory));
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.set("view engine", "hbs");

app.use(userRouter);
app.use(taskRouter);

module.exports = app;
