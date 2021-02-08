const express = require("express")
const { makePayment } = require("../controllers/stripePayment")
const router = express.Router()

router.post("/stripePayment", makePayment)

module.exports = router