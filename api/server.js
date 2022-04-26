const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const { json } = require("body-parser");


dotenv.config({ path: "./config.env" });

const app = express();

app.use(cors());
app.use(json());

const defaultPriorty = [
  { id: "1", color: "#E15031", name: "Urgent" },
  { id: "2", color: "#DCE432", name: "Regular" },
  { id: "3", color: "#3450D1", name: "Trivial" }
];
app.get("/default", (req, res) => res.send(defaultPriorty));



const PORT = 1881;

app.listen(PORT, console.log(`Server running on port ${PORT}`.green.bold));
