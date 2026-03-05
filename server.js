const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
const path = require("path");

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));
app.use("/auth", require("./routes/auth"));
app.use("/employee", require("./routes/employee"));
app.use("/salary", require("./routes/salary"));
async function startServer() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/employee-payroll");
        console.log("MongoDB Connected");
        app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});
        app.listen(5000, () => {
            console.log("Server running on http://localhost:5000");
        });

    } catch (error) {
        console.log("MongoDB Connection Error:", error);
    }
}

startServer();