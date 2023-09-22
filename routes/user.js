const userController = require('../controllers/user')
const router = require('express').Router()
router.get('/dashboard',userController.Dashboard)




module.exports = router