require("dotenv").config();
const express = require("express");
const app = express();
var cookieParser = require("cookie-parser");
const PORT = process.env.PORT;
const cors = require("cors");
const todoRoutes = require("./Routes/todoRoutes");
const { connectToDb } = require("./config/database");

connectToDb();
// Middleware
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept,application/json"
  );
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", todoRoutes);

app.listen(PORT, () => {
  console.log(`Application is listening at http://localhost:${PORT}`);
});
