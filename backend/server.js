const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Student = require("./data");

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

// loading some data to start
const students = [
  {
    firstName: "Harvey",
    lastName: "Specter",
    birthDate: "1972-01-22",
    photo:
      "https://www.hellomagazine.com/imagenes/film/2018060749261/suits-gabriel-macht-sex-and-the-city-20th-anniversary/0-242-950/Gabriel-Macht-t.jpg",
    hobbies: "Boxing,Music and vinyl collecting,Cars,Whisky tasting/drinking",
    id: 1
  },
  {
    firstName: "Michel",
    lastName: "Ross",
    birthDate: "1981-08-27",
    photo: "http://www.gstatic.com/tv/thumb/persons/333660/333660_v9_ba.jpg",
    hobbies: "Cycling, traveling",
    id: 2
  },
  {
    firstName: "Dona",
    lastName: "Paulsan",
    birthDate: "1972-12-06",
    photo: "http://www.gstatic.com/tv/thumb/persons/207737/207737_v9_ba.jpg",
    hobbies: "Dressing, art and craft",
    id: 3
  },
  {
    firstName: "Rachel",
    lastName: "Zane",
    birthDate: "1981-08-08",
    photo: "http://www.gstatic.com/tv/thumb/persons/291403/291403_v9_bb.jpg",
    hobbies: "Dressing, art and craft",
    id: 4
  }
];

Student.create(students, function(err, jellybean, snickers) {});

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
  Student.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get("/searchStudents/:searchKey", (req, res) => {
  Student.find({ firstName: /.*req.params.searchKey.*/ }, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post("/updateStudent", (req, res) => {
  const { id, update } = req.body;
  Student.findOneAndUpdate({ id }, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteStudent", (req, res) => {
  const { id } = req.body;
  Student.findOneAndDelete({ id }, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post("/putStudent", (req, res) => {
  let student = new Student();

  const { id, firstName, lastName, hobbies, birthDate, photo } = req.body;

  if (!id && id !== 0) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }

  student.firstName = firstName;
  student.id = id;
  student.lastName = lastName;
  student.hobbies = hobbies;
  student.birthDate = birthDate;
  student.photo = photo;

  student.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
