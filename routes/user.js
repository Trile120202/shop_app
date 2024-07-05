const router = require("express").Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../middleware/verifyToken");

// UPADATE USER
router.put("/:id", verifyToken, userController.updateUser);

// DELETE USER
router.delete("/", verifyToken, userController.deleteUser);

// GET USER PROFILE
router.get("/profile", verifyToken, userController.getUser);

module.exports = router;
