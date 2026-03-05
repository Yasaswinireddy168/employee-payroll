const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

/* REGISTER */
router.post("/register", async (req, res) => {
    try {

        const { firstName, lastName, empId, email, gender, address, designation, password } = req.body;

        const existing = await User.findOne({ empId });
        if(existing){
            return res.status(400).json({ message: "Employee already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            empId,
            email,
            gender,
            address,
            designation,
            password: hashedPassword
        });

        await user.save();

        res.json({ message: "Registered Successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


/* LOGIN */
router.post("/login", async (req, res) => {
    try {

        const { empId, password } = req.body;

        const user = await User.findOne({ empId });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Wrong password" });
        }

        // 👇 THIS IS THE IMPORTANT PART
        res.json({
            firstName: user.firstName,
            lastName: user.lastName,
            empId: user.empId,
            designation: user.designation
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
 

/* CHANGE PASSWORD */
router.post("/change-password", async (req, res) => {
    try {

        const { empId, oldPassword, newPassword } = req.body;

        const user = await User.findOne({ empId });
        if(!user){
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch){
            return res.status(400).json({ message: "Old password incorrect" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({ message: "Password changed successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
