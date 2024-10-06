const router = require('express').Router();
const roleController = require('../controller/roleController');

router.get('/',roleController.getAllRoles);
router.post('/addrole',roleController.postRole);

module.exports = router;
