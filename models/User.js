const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    empId: String,
    email: String,
    gender: String,
    address: String,
    designation: String,
    password: String
});

module.exports = mongoose.model("User", userSchema);
