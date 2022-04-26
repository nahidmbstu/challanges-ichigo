const express = require("express");
const bodyParser = require("body-parser");
const winston = require("winston");

const app = express();
const port = 4000;

// parse application/json
app.use(bodyParser.json());

// i have used redis as in memory data structure
const client = require("./db");

const logger = require("./logger");

// If we're not in production then log to the `console` with the format:
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

// app routes
const rewards = require("./routes/rewards");
app.use("/users", rewards);

module.exports = app.listen(port);
