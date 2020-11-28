const { request } = require("express")
const Category = require("../models/category")

exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "category not found in Database"
            })
        }
        req.category = category
        next()
    })
}

exports.createCategory = (req, res) => {

    const category = new Category(req.body)
    category.save((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Not able to save category in DB"
            })
        }

        res.json({ category })
    })

}

exports.getAllCategory = (req, res) => {
    Category.find().exec((err, categories) => {
        if (err || !categories) {
            return res.status(400).json({
                error: "No categories Found in DB"
            })
        }

        return res.json(categories);
    })
}

exports.getCategory = (req, res) => {
    return res.json(req.category)
}

exports.updateCategory = (req, res) => {

    console.log("kjsdlskhfjhfkjsdfhkjshfjkkjdfhkjsdhkjsdhfkjsdhfk")
    const category = req.category;
    category.name = req.body.name;
    category.save((err, updatedCategory) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to update category"
            })
        }

        res.json(updatedCategory)
    })
}

exports.deleteCategory = (req, res) => {
    const category = req.category;
    if (!category) {
        return res.status(400).json({
            error: "Failed to delete category"
        })
    }
    category.remove((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to delete category"
            })
        }

        res.json({ message: `Category "${category.name}" Successful deleted` })
    })
}