const express = require("express");
const statisticController = require("../controllers/statistiqueController");

const router = express.Router();

router.get("/totalProperties/:userId", statisticController.getTotalProperties);
router.get("/totalIncomes/:userId", statisticController.getTotalIncomes);
router.get("/totalExpenses/:userId", statisticController.getTotalExpenses);
router.get("/payment-history/:userId", statisticController.getPaymentHistory);
router.get(
  "/maintenance-status/:userId",
  statisticController.getMaintenanceStatus
);
module.exports = router;
