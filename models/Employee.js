const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    empId: {
        type: String,
        required: true
    },
    name: String,
    position: String,
    basicSalary: Number,
    bonus: Number,
    deductions: Number,
    netSalary: Number
});

module.exports = mongoose.model("Employee", employeeSchema);
