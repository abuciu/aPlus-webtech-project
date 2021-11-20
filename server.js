const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("sequelize");

const app = express();

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to aPlus." });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
