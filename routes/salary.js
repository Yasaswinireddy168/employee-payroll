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

        const salary = await Salary.aggregate([
            { $match: { empId: req.params.empId } },

            // Sort latest first
            { $sort: { year: -1, _id: -1 } },

            // Group by month + year
            {
                $group: {
                    _id: { month: "$month", year: "$year" },
                    netSalary: { $first: "$netSalary" }
                }
            },

            // Format output
            {
                $project: {
                    _id: 0,
                    month: "$_id.month",
                    year: "$_id.year",
                    netSalary: 1
                }
            },

            // Sort again (latest month first)
            { $sort: { year: -1 } }

        ]);

        res.json(salary);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
module.exports = router;