const categoryModel = require('../models/categoryModel.js')

class CategoryController {
    static async getAllCategories(req, res) {
        const user = req.user._id;
        // console.log(user);
        try {
            const Allcategories = await categoryModel.find({user});
            res.status(200).json(Allcategories);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    static async addNewCategory(req, res) {
        const { title } = req.body;
        const user = req.user._id;
        // console.log(user);
        try {
            if (title) {
                const isTitle = await categoryModel.findOne({ title, user});
                if (!isTitle) {
                    const newTitle = new categoryModel({ title, user });
                    const savedTitle = await newTitle.save();
                    res.status(200).json({ savedTitle, message: "Category added successfully" });
                }
                else{
                  
                    res.status(400).json({ message: "Category already exists" })
                }

            }
            else {
                res.status(400).json({ message: "Please provide a title" })
            }
        }

        catch (err) {
            res.status(500).json({ message: err.message })
        }
    }
}

module.exports = CategoryController;