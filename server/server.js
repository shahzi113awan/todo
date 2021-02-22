const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const bodyParser = require("body-Parser");
const mongoose = require("mongoose");
const todoRouter = new express.Router();
let Todo = require("./todo.modal");

app.use(cors());
app.use(bodyParser.json());
mongoose.connect("mongodb://127.0.0.1:27017/Todo", { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("connected");
});

//
app.get("/", (req, res) => res.send("Hello World!"));

// get All todos
todoRouter.route("/").get((req, res) => {
  Todo.find((err, todos) => {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});
todoRouter.route("/:id").get((req, res) => {
  let id = req.params.id;
  Todo.findById(id, (err, todo) => {
    res.json(todo);
  });
});
// find by id
todoRouter.route("/add").post((req, res) => {
  let todo = new Todo(req.body);
  todo
    .save()
    .then((todo) => {
      console.log(req.body);
      console.log(todo);

      res.status(200).json({ todo: "todo has been added" });
    })
    .catch((err) => {
      res.status(400).send("there is error in saving");
    });
});
//update Todo
todoRouter.route("/update/:id").post((req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (!todo) {
      res.status(400).send("data not there");
    } else {
      Todo.desc = req.body.todo.desc;
      Todo.responsible = req.body.todo.responsible;
      Todo.completed = req.body.todo.completed;
      Todo.priority = req.body.todo.priority;
      Todo.save().then((todo) => {
        res.json("todo updated").catch((err) => {
          res.status(400).send("not Updating");
        });
      });
    }
  });
});

app.use("/todos", todoRouter);
app.listen(port, () => console.log(`Example app listening on port port!`));
