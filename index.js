const express = require("express");
const cors = require("cors");
const app = express();
var bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
// var requestTime = function(req, res, next) {
//   req.requestTime = new Date();
//   next();
// };

let todoList = [
  { todo: "learn NodeJs", done: false },
  { todo: "Learn ReactJs", done: false }
];
// app.use(requestTime);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.get("/todo", (req, res) => {
  res.send({ data: todoList });
});

app.get("/todo/:id", (req, res) => {
  let length = todoList.length;
  let index = req.params.id;

  if (index > length - 1) {
    res.send("not found");
  } else {
    res.send({ data: todoList[index] });
    console.log(index, length);
  }
});

app.post("/todo", (req, res) => {
  let todo = req.body;
  console.log(typeof todo);
  if (todo === "") {
    res.send("todo cannont empty");
  } else {
    todoList.push(todo);
    res.send({ sucess: true, data: todo });
  }
});

app.delete("/todo/:id", (req, res) => {
  let length = todoList.length;
  let index = req.params.id;

  if (index > length - 1) {
    res.send({ sucess: false, message: "data not found" });
  } else {
    todoList.splice(index, 1);
    res.send({ success: true, data: todoList });
  }
});

app.listen(PORT, () => console.log("Example app listening on port 3000!"));
