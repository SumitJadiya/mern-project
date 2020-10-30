var express = require('express')
const { body } = require('express-validator');
const { signout, signup, signin, isSignedIn } = require('../controllers/auth')
var router = express.Router()


router.post(
    "/signup",
    [
        body("name").isLength({ min: 3 }).withMessage('Name must be at least 3 chars long'),
        body("password").isLength({ min: 3 }).withMessage('Password must be at least 3 chars long'),
        body('email').isEmail(),
    ],
    signup
)

router.post(
    "/signin",
    [
        body("password").isLength({ min: 3 }).withMessage('Password must be at least 3 chars long'),
        body('email').isEmail().withMessage('Please provide valid Email'),
    ],
    signin
)

router.get("/signout", signout)

module.exports = router;