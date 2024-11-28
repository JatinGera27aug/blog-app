const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");
const authModel = require("../models/authModel");
const BlogController = require("../controllers/blogController");
const CategoryController = require("../controllers/categoryController");
const upload = require("../config/multer");
const checkAuthenticatedUser  = require("../middlewares/authMiddlewares");

router.post("/user/register", AuthController.userRegistration);
router.post("/user/login", AuthController.userLogin);
router.post("/add/Blog", upload.single("thumbnail"), checkAuthenticatedUser, BlogController.addBlog);
router.post("/add/category", checkAuthenticatedUser, CategoryController.addNewCategory);

router.get('/get/allBlogs',checkAuthenticatedUser, BlogController.getAllBlogs);
router.get('/get/blog/:id',checkAuthenticatedUser, BlogController.getSingleBlog);

router.get("/get/categories",checkAuthenticatedUser, CategoryController.getAllCategories);

module.exports = router;