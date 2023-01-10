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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", todoRoutes);

app.listen(PORT, () => {
  console.log(`Application is listening at http://localhost:${PORT}`);
});
