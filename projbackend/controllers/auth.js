const User = require("../models/user")
const { validationResult } = require('express-validator');
exports.signout = (req, res) => {
    res.json({
        message: "User Signout"
    })
}

exports.signup = (req, res) => {
    // console.log("REQ BODY", req.body)
    // res.json({
    //     message: "User Signed Up!"
    // })
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()[0] });
    }

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
    res.json({
        message: "User Signed In!"
    })
}