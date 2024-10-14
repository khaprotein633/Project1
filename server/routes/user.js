const router = require('express').Router();
const userController  = require('../controller/userController');

router.get('/get',userController.getAllUsers);
router.get('/get/:user_id',userController.getUserById);
router.post('/register_user', userController.addUser);
router.post('/loginUser', userController.loginUser);

router.put('/update/:user_id', userController.updateUser);
router.delete('/delete/:user_id', userController.deleteUser);

module.exports = router