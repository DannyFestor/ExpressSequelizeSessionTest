var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('../views/login.ejs')
});

router.post('/', function(req, res, next) {
  userController.loginRegister(req, res, next);
})

module.exports = router;
