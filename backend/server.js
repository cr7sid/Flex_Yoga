const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const { sendSuccess, sendError } = require("./utility/helper");
const errors = require("./utility/errors");

const userRoutes = require("./routes/user");

require("./db/connect");

var app = express();

// Middlewares
app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,content-encoding"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use(cookieParser());
app.use(cors());

app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  return sendSuccess(res, {"message": "Hello World"})
});

app.listen(8080, function () {
	console.log(`Base server is running on 8080 ✅`);
});

module.exports = app;
