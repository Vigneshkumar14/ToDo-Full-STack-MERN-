const mongoose = require("mongoose");
const { Schema } = mongoose;

const todo = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "Title is required"],
    maxLength: 200,
  },
  task: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId },
      taskItem: String,
      creeateDate: Date,
      modifiedDate: Date,
    },
  ],
});

module.exports = mongoose.model("Todo", todo);

// { type: mongoose.Schema.Types.ObjectId }
