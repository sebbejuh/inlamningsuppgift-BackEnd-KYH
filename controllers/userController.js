const router = require('express').Router()
const userModel = require('../models/userModel')
const auth = require('../authentication/auth')

//  Registrera en ny user & få en token- /api/users/register
router.post('/register', userModel.registerUser);
//  Logga in med en user & få en token - /api/users/login
router.post('/login', userModel.loginUserWithUserNameAndPassword);
//  Hämta user info - Inte en del av uppgiften
router.get('/me', auth.verifyToken, userModel.getUserData)

module.exports = router