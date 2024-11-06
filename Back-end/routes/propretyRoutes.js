const express = require("express");
const propretyController = require("../controllers/propretyController");

const router = express.Router();

router.post("/properties", propretyController.createProperty);

router.get("/properties", propretyController.getAllProperty);

router.get("/properties/:id", propretyController.getProperty);

router.put("/properties/:id", propretyController.updateProperty);

router.delete("/properties/:id", propretyController.deleteProperty);

module.exports = router;
