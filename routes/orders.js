const router = require('express').Router();
const orderController = require('../controllers/ordersController');
const { verifyToken } = require("../middleware/verifyToken");


router.get("/all", orderController.getOrders);
router.get("/",verifyToken, orderController.getUserOrders);

module.exports = router
