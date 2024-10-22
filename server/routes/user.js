const router = require('express').Router();
const userController  = require('../controller/userController');

router.get('/getAllUser',userController.getAllUsers);
router.get('/get/:_id',userController.getUserById);
router.post('/adduser', userController.addUser); 
router.put('/update/:_id', userController.updateUser); 
router.delete('/delete/:_id', userController.deleteUser); 

module.exports = router