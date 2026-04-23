const Grievance = require("../models/Grievance");

// Create
exports.createGrievance = async (req, res) => {
    try {
        const grievance = await Grievance.create({
            ...req.body,
            user: req.user
        });
        res.json(grievance);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get All
exports.getAll = async (req, res) => {
    const data = await Grievance.find({ user: req.user });
    res.json(data);
};

// Get by ID
exports.getById = async (req, res) => {
    const data = await Grievance.findById(req.params.id);
    res.json(data);
};

// Update
exports.update = async (req, res) => {
    const data = await Grievance.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(data);
};

// Delete
exports.delete = async (req, res) => {
    await Grievance.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted successfully" });
};

// Search
exports.search = async (req, res) => {
    const { title } = req.query;

    const results = await Grievance.find({
        title: { $regex: title, $options: "i" }
    });

    res.json(results);
};