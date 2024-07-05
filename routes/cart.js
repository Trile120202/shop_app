const router = require("express").Router();
const cartController = require('../controllers/cartController');
const { verifyToken } = require("../middleware/verifyToken");

router.get("/find/",verifyToken, cartController.getCart);

router.post("/",verifyToken, cartController.addCart);

router.delete("/:cartItem",verifyToken, cartController.deleteCartItem);

router.delete("/cart",verifyToken, cartController.resetCart);

module.exports = router
