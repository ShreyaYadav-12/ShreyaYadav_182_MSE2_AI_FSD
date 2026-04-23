const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const {
    createGrievance,
    getAll,
    getById,
    update,
    delete: deleteGrievance,
    search
} = require("../controllers/grievanceController");

router.post("/", auth, createGrievance);
router.get("/", auth, getAll);
router.get("/search", auth, search);
router.get("/:id", auth, getById);
router.put("/:id", auth, update);
router.delete("/:id", auth, deleteGrievance);

module.exports = router;