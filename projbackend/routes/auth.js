var express = require('express')
const { body } = require('express-validator');
const { signout, signup, signin } = require('../controllers/auth')
var router = express.Router()

router.get("/signout", signout)

router.post(
    "/signup",
    [
        body("name").isLength({ min: 3 }).withMessage('must be at least 3 chars long'),
        body('email').isEmail(),
    ],
    signup)

router.post("/signin", signin)

module.exports = router;