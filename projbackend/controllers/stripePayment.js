const uuid = require('uuid/v4')
// const stripe = require("stripe")("SECRET_KEY")
const stripe = require("stripe")("sk_test_51IIFEILdVYqvLkoLrOM9BPxDCjwFciPCCwxtcRjpBzhAZSI7vckdZ2BuXmuhH6cBoFzqfYTSvmRwXx65Fbz2x8r000Hk9tTFO1")

exports.makePayment = (req, res) => {
    const { products, token } = req.body
    console.log("products ", products)

    let amount = products?.reduce((currentValue, nextValue) => { return currentValue + nextValue.price }, 0)

    const idempotencyKey = uuid()

    return stripe.customers.create({
        email: token.email,
        source: token.id
    })
        .then(customer => {
            stripe.charges.create({
                amount,
                currency: "inr",
                customer: customer.id,
                receipt_email: token.email,
                description: "a test account",
                shipping: {
                    name: token.card.name,
                    address: {
                        line1: token.card.address_line1,
                        line2: token.card.address_line2,
                        city: token.card.address_city,
                        country: token.card.address_country,
                        postal_code: token.card.address_zip
                    }
                }
            }, { idempotencyKey }
            )
                .then(result => res.status(200).json(result))
                .catch(err => console.log(err))
        })
}