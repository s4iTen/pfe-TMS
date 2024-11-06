const express = require('express');
const router = express.Router();
const maintainerController = require('../controllers/maintainerController');

router.get('/maintainers', maintainerController.getMaintainers);
router.get('/maintainers/:id', maintainerController.getMaintainer);
router.post('/maintainers', maintainerController.createMaintainer);
router.put('/maintainers/:id', maintainerController.updateMaintainer);
router.delete('/maintainers/:id', maintainerController.deleteMaintainer);

module.exports = router;
