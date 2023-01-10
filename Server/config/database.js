const mongoose = require("mongoose");

const MONGODBURL = process.env.MONGODBURL;

exports.connectToDb = () => {
  mongoose
    .connect(MONGODBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("Database is connected"))
    .catch((error) => {
      console.log("Database connection failed");
      console.log(error);
      process.exit(1);
    });
};
