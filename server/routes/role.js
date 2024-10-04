const router = require('express').Router();
const roleController = require('../controller/roleController');

router.get('/',roleController.getAllRoles);

module.exports = router;
