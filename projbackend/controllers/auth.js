const User = require("../models/user")
const { validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
const user = require("../models/user");


exports.signout = (req, res) => {
    res.clearCookie("token")
    res.json({
        message: "User Signed Out Successfully"
    })
}

exports.signup = (req, res) => {

    if (validation(req, res))
        return

    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: "Not able to save user in DB"
            })
        }

        res.json({
            id: user._id,
            name: user.name,
            last_name: user.last_name,
            role: user.role,
        })
    })
}

exports.signin = (req, res) => {
    const { email, password } = req.body

    if (validation(req, res))
        return

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User doesn't exits"
            })
        }

        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and Password do not match"
            })
        }

        // create token
        const token = jwt.sign({ _id: user._id }, 'sumitJadiya');

        // put token in cookie
        var expiryDate = new Date(Number(new Date()) + 315360000000);
        res.cookie("token", token, { expires: expiryDate })

        // Send response to FE
        const { _id, name, email, role } = user

        return res.json({ token, user: { _id, name, email, role } })
    })
}

// validation
function validation(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()[0] });
    }
}

// protected routes
exports.isSignedIn = expressJwt({
    secret: 'sumitJadiya',
    userProperty: "auth"
})


// custom middleware
exports.isAuthenticated = (req, res, next) => {

    let checker = req.profile && req.auth && req.profile._id == req.auth._id
    if (!checker)
        return res.status(403).json({ error: "Access Denied" })
    next()
}

exports.isAdmin = (req, res, next) => {

    if (req.profile.role === 0) return res.status(403).json({ error: "Access Denied" })
    next()
}