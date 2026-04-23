const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect DB
connectDB();

// Routes
app.use("/api", require("./routes/authRoutes"));
app.use("/api/grievances", require("./routes/grievanceRoutes"));

// Test route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});