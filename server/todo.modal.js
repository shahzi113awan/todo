const mongoose = require("mongoose");
const schema = mongoose.Schema;
let todoSchema = new schema({
  desc: {
    type: String,
  },
  responsible: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
  priority: {
    type: String,
  },
});
const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
