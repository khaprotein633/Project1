const router = require('express').Router();
const userController  = require('../controller/userController');

router.get('/get',userController.getAllUsers);
router.get('/get/:_id',userController.getUserById);
router.post('/add', userController.addUser); 
router.put('/update/:_id', userController.updateUser); 
router.delete('/delete/:_id', userController.deleteUser); 

module.exports = router