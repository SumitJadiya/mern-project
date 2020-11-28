const express = require("express")
const router = express.Router()

const { getCategoryById, createCategory, getAllCategory, getCategory, updateCategory, deleteCategory } = require("../controllers/category")
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth")
const { getUserById } = require("../controllers/user")

// params
router.param("userId", getUserById)
router.param("categoryId", getCategoryById)

// routes -> Create
router.post(
    "/category/create/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createCategory)

// routes -> Read
router.get("/categories", getAllCategory)

router.get("/category/:categoryId", getCategory)

// routes -> update
router.put(
    "/category/:categoryId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateCategory)

// routes -> delete
router.delete(
    "/category/:categoryId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    deleteCategory)

module.exports = router