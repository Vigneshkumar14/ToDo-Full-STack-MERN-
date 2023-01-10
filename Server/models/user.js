const mongoose = require("mongoose");
const { Schema } = mongoose;

const user = new Schema({
  name: { type: String, required: true, maxLength: 30 },
  email: {
    type: String,
    required: () => {
      return this.provider !== "email" ? false : true;
    },
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", user);
