const express = require("express");
const router = express.Router();
const Salary = require("../models/Salary");


// SAVE SALARY (ADD THIS PART)
router.post("/save", async (req, res) => {

    try {

        const { empId, basicSalary, bonus, deductions, netSalary, month, year } = req.body;

        const salary = new Salary({
            empId,
            basicSalary,
            bonus,
            deductions,
            netSalary,
            month,
            year
        });

        await salary.save();

        res.json({ message: "Salary saved successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


// GET LATEST SALARY FOR EMPLOYEE
router.get("/:empId", async (req, res) => {

    try {

        const salary = await Salary.findOne({ empId: req.params.empId })
                                   .sort({ year: -1 });

        if (!salary) {
            return res.status(404).json({ message: "No salary record found" });
        }

        res.json(salary);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;