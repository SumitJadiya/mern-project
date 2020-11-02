const User = require("../models/user")
const Order = require("../models/order")
const { request } = require("express")

exports.getUserById = (req, res, next, id) => {

    User.findById(id).exec((err, user) => {

        if (err || !user) {
            return res.status(400).json({
                error: "No User Found in DB"
            })
        }

        req.profile = user
        next()
    })
}

exports.getUser = (req, res) => {

    req.profile.salt = undefined
    req.profile.encry_password = undefined
    return res.json(req.profile)
}

exports.getAllUsers = (req, res) => {

    User.find().exec((err, users) => {
        if (err || !users) {
            return res.status(400).json({
                error: "No Users Found in DB"
            })
        }

        users.map(user => {
            user.salt = undefined
            user.encry_password = undefined
        })

        return res.json(users);
    })
}


exports.updateUser = (req, res) => {

    User.findByIdAndUpdate(
        {
            _id: req.profile._id
        },
        {
            $set: req.body
        },
        {
            new: true,
            useFindAndModify: false
        },
        (err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: "Not authorized"
                })
            }

            user.salt = undefined
            user.encry_password = undefined
            res.json(user)
        }
    )
}

exports.userPurchaseList = (req, res) => {

    Order.find({ user: req.profile._id }).populate("user", "_id name").exec((err, order) => {
        if (err || !order) {
            return res.status(400).json({
                error: "No Orders"
            })
        }

        res.json(order)
    })
}

exports.pushOrderInPurchaseList = (req, res, next) => {

    let purchases = []

    req.body.order.products.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        })
    })

    // store in db
    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $push: { purchases: purchases } },
        { new: true }
    ),
        (err, purchases) => {
            if (err || !purchases) {
                return res.status(400).json({
                    error: "Unable to save purchase list"
                })
            }
        }
    next()
}