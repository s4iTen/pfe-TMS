const express = require("express");
const expenceController = require("../controllers/expenceController");

const router = express.Router();

router.post("/expences", expenceController.createExpence);
router.get("/expences", expenceController.getAllExpence);
router.get("/expences/:id", expenceController.getExpence);
router.put("/expences/:id/status", expenceController.updateExpenceStatus);
router.put("/expences/:id/details", expenceController.updateExpenceDetails);

module.exports = router;
