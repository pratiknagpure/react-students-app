const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");

const API_PORT = 3001;
const app = express();
const router = express.Router();

// this is our MongoDB database
const dbRoute =
  "mongodb+srv://pratik:XgPbcZR6C7q9ZkDq@app-fqtc9.mongodb.net/test1?retryWrites=true";

mongoose.connect(dbRoute, { useNewUrlParser: true });

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("connected to the database"));

const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  birthDate: String,
  hobbies: String,
  photo: String
});

const student = mongoose.model("Student", studentSchema);

const students = [
  {
    firstName: "Harvey",
    lastName: "Specter",
    birthDate: "",
    photo: "",
    hobbies: ""
  },
  {
    firstName: "Michel",
    lastName: "Ross",
    birthDate: "",
    photo: "",
    hobbies: ""
  },
  {
    firstName: "Dona",
    lastName: "Paulsan",
    birthDate: "",
    photo: "",
    hobbies: ""
  },
  {
    firstName: "Rachel",
    lastName: "Zane",
    birthDate: "",
    photo: "",
    hobbies: ""
  }
];

student.create(students, function(err, jellybean, snickers) {});

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.get("/", (req, res) => {
  res.send("Server Works");
});

// this is our get method
// this method fetches all available data in our database
router.get("/getStudents", (req, res) => {
  student.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post("/updateData", (req, res) => {
  const { id, update } = req.body;
  Data.findOneAndUpdate(id, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  Data.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post("/putData", (req, res) => {
  let data = new Data();

  const { id, message } = req.body;

  if ((!id && id !== 0) || !message) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.message = message;
  data.id = id;
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
