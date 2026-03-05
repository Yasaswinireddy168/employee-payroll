const express = require("express");
const Employee = require("../models/Employee");

const router = express.Router();


// 🔹 ADD EMPLOYEE
router.post("/add", async (req, res) => {
    try {

        const { empId, name, position, basicSalary, bonus, deductions } = req.body;

        const netSalary =
            Number(basicSalary) +
            Number(bonus) -
            Number(deductions);

        const employee = new Employee({
            empId,
            name,
            position,
            basicSalary,
            bonus,
            deductions,
            netSalary
        });

        await employee.save();

        res.json({ message: "Employee Added Successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
});


// 🔹 GET ALL EMPLOYEES
router.get("/all", async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
});


// 🔹 GET SINGLE EMPLOYEE BY empId (IMPORTANT FOR DASHBOARD)
router.get("/:empId", async (req, res) => {
    try {

        const employee = await Employee.findOne({
            empId: req.params.empId
        });

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.json(employee);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
});


module.exports = router;