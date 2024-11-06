const express = require("express");
const rentController = require("../controllers/rentController");

const router = express.Router();

router.post("/rents", rentController.createRent);
router.get("/rents", rentController.getAllRents);
router.get("/rents/:id", rentController.getRent);

module.exports = router;
