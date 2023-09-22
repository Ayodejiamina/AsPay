 const express = require('express')
 const authController = require('../controllers/auth')
 const { check } = require('express-validator')
 const router = express.Router()
router.get('/register',authController.Register)
router.post('/register',[
    check('name').notEmpty().withMessage('name is required'),
    check('email').notEmpty().withMessage('email is required'),
    check('phone').notEmpty().withMessage('phone is required'),
    check('password').notEmpty().withMessage('password is required').isLength({min:8}).withMessage('password must not be less 8 character')

],authController.postReg)
router.get('/login',authController.login)
router.post('/login',[
    check('email').notEmpty().withMessage('email is required'),
    check('password').notEmpty().withMessage('password is required').isLength({min:8}).withMessage('password must not be less 8 character')

],authController.postLog)
router.get('/',authController.Index)


 module.exports = router