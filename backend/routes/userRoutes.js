const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')


router.post('/register', usersController.createNewUser);

router.route('/')
    .post(usersController.createNewUser)
    .get(usersController.getAllUsers)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

module.exports = router