const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema({
    empId: String,
    month: String,
    year: Number,
    basicSalary: Number,
    bonus: Number,
    deductions: Number,
    netSalary: Number
});

module.exports = mongoose.model("Salary", salarySchema);
