const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const errorHandler = require("./src/middlewares/ErrorHandler");
const routes = require("./src/routes/routes");
// Create  express application
const app = express();
dotenv.config();

// Database connection
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection successfull!"))
  .catch((err) => console.log(err));

// Request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parsre
app.use(cookieParser(process.env.COOKIE_SECRET));
// Set view engine
app.set("view engine", "ejs");

// Request static path
app.use(express.static(path.join(__dirname, "public")));

// Request handler routes
app.use("/", routes);

// 404 error handler
app.use(errorHandler.notFound);

// default error handler
app.use(errorHandler.defaultError);

// application listening
app.listen(process.env.PORT, () => {
  console.log("Application listening on port " + process.env.PORT);
});
