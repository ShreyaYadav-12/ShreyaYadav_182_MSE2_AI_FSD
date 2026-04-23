const mongoose = require("mongoose");

const grievanceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
        type: String,
        enum: ["Academic", "Hostel", "Transport", "Other"]
    },
    date: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ["Pending", "Resolved"],
        default: "Pending"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("Grievance", grievanceSchema);