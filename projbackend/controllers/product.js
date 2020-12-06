const Product = require("../models/product")
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")
const { sortBy } = require("lodash")

exports.getProductById = (req, res, next, id) => {

    Product.findById(id)
        .populate("category")
        .exec((err, product) => {
            if (err) return throwError(res, "Product not found!")

            return res.status(200).json(product);
        })
    req.product = product
    next()
}

exports.getProduct = (req, res) => {
    req.product.photo = undefined
    return res.json(req.product)
}

// middleware to fetch images in bg
exports.photo = (req, res, next) => {

    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}

exports.createProduct = (req, res) => {

    let form = new formidable.IncomingForm();
    form.keepExtensions = true
    form.parse(req, (err, fields, file) => {
        if (err) return throwError(res, "getting problem with image. Please try again!")

        // destructure the fields
        const { name, description, price, category, stock, } = fields

        // validation
        if (!name || !description || !price || !category || !stock) {
            return throwError(res, "Please include all fields and try again!")
        }

        let product = new Product(fields)

        // handle file here
        if (file.photo) {
            // check if size is > 3MB
            if (file.photo.size > 3000000)
                return throwError(res, "File size too big!")

            // this save photo in database
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }

        // SAVE to db
        product.save((err, product) => {
            if (err) return throwError(res, "Unable to save tshirt in DB. Please try again!")

            return res.json(product);
        })
    })
}

exports.deleteProduct = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) return throwError(res, "unable to delete the product")

        res.json({
            message: "product deleted successfully!",
            deletedProduct
        })
    })
}

exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true
    form.parse(req, (err, fields, file) => {
        if (err) return throwError(res, "getting problem with image. Please try again!")

        // updating the product
        let product = req.product
        product = _.extend(product, fields)

        // handle file here
        if (file.photo) {
            // check if size is > 3MB
            if (file.photo.size > 3000000)
                return throwError(res, "File size too big!")

            // this save photo in database
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }

        // SAVE to db
        product.save((err, product) => {
            if (err) return throwError(res, "Unable to update tshirt in DB. Please try again!")

            return res.json(product);
        })
    })
}

exports.getAllProducts = (req, res) => {

    let limit = req.query.limit ? parseInt(req.query.limit) : 8
    let sortBy = req.query.sortBy ? req.query.sortBy : _id

    Product
        .find()
        .select("-photo")
        .populate("categorỳ̀")
        .sort([[sortBy, "asc"]])
        .limit(limit)
        .exec((err, products) => {
            if (err) return throwError(res, "unable to find products")

            res.json(products)
        })

}

exports.updateStock = (req, res, next) => {
    let myOperations = req.body.order.products.map(product => {
        return {
            updateOne: {
                filter: { _id: product._id },
                update: { $inc: { stock: -product.count, sold: +product.count } }
            }
        }
    })

    Product.bulkWrite(myOperations, {}, (err, products) => {
        if (err) return throwError(res, "Bulk Operation failed!")
    })

    next()
}

exports.getAllUniqueCategories = (req, res) => {
    Product.distinct("category", {}, (err, category) => {
        if (err) return throwError(res, "No category found!")

        return res.json(category)
    })
}

const throwError = (res, message) => {
    return res.status(400).json({
        error: message
    })
}