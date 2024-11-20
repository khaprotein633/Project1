const router = require('express').Router();
const roleController = require('../controller/roleController');

router.get('/get',roleController.getAllRoles);
router.post('/add',roleController.postRole);

module.exports = router;
