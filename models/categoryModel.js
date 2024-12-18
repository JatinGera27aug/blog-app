const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title:{
        type:String,
         },
         user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
});

const CategoryModel = mongoose.model('Category',categorySchema);
module.exports = CategoryModel;