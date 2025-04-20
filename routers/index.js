const Controller = require('../controllers/controller')
const express = require('express')
const authentication = require('../middlewares/authentication')
const onlyAuthor = require('../middlewares/authorization')
const router = express.Router()

// router.use(authentication)
router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.get('/groceries', authentication, Controller.getGrocery)
router.delete('/groceries/:id', authentication, onlyAuthor, Controller.delGrocery)
router.post('/groceries', authentication, Controller.createGrocery)
router.put('/groceries/:id', authentication, onlyAuthor, Controller.updateGrocery)



module.exports = router