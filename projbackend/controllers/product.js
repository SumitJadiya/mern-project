const Product = require("../models/product")
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")

exports.getProductById = (req, res, next, id) => {

    Product.findById(id)
        .populate("category")
        .exec((err, product) => {
            if (err) return throwError("Product not found!")

            return res.status(200).json(product);
        })
    req.product = product
    next()
}

exports.getProduct = (req, res) => {
    return res.json(req.product)
}


exports.createProduct = (req, res) => {

    let form = new formidable.IncomingForm();
    form.keepExtensions = true
    form.parse(req, (err, fields, file) => {
        if (err) return throwError("getting problem with image. Please try again!")

        //TODO: Restriction on fields
        let product = new Product(fields)

        // handle file here
        if (file.photo) {
            // check if size is > 3MB
            if (file.photo.size > 3000000)
                return throwError("File size too big!")

            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }

        // SAVE to db
        product.save((err, product) => {
            if (err) return throwError("Unable to save tshirt in DB. Please try again!")

            return res.json(product);
        })
    })
}

const throwError = (message) => {
    return res.status(400).json({
        error: message
    })
}