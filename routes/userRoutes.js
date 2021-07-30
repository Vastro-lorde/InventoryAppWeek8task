// importing the necessary modules
const router = require('express').Router();
const userController = require('../controller/userController')

router.get('/', userController.getAllUsers )
router.post('/signup', userController.createUser )
router.patch('/:id', userController.updateUser )
router.post('/login', userController.signin )
router.delete('/:id', userController.deleteUser )

// exporting the router
module.exports = router;