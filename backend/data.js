const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const StudentSchema = new Schema({
  id: Number,
  firstName: String,
  lastName: String,
  birthDate: String,
  photo: String,
  hobbies: String
});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Student", StudentSchema);
