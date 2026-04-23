const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.header("Authorization");

    // Check if header exists
    if (!authHeader) {
        return res.status(401).json({ msg: "No token, unauthorized" });
    }

    try {
        // Format: "Bearer <token>"
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ msg: "Token missing" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user ID to request
        req.user = decoded.id;

        next();
    } catch (error) {
        return res.status(401).json({ msg: "Invalid token" });
    }
};