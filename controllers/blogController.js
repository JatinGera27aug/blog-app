const BlogModel = require('../models/blogModel.js')
class BlogController{
    static async getAllBlogs(req, res){
        try{
            // const AllBlogs = await BlogModel.find();
            const AllBlogs = await BlogModel.find({user: req.user._id});
            res.status(200).json(AllBlogs);
        }
        catch(err){
            res.status(500).json({message:err.message})
        }
    }

    static async addBlog(req, res){
        // console.log("File data:", req.file);
        const {title, category, description} = req.body;
        const user = req.user._id;
        try{
            if(!title || !category || !description){
                res.status(400).json({message:"all fields are required"});
            }
            else{
                const isPresentTitle = await BlogModel.findOne({title:title,user});
                if(isPresentTitle){
                    res.status(400).json({message:"Blog with same title already exists"});
                }
                else{
                    const newBlog = new BlogModel({
                        title:title,
                        description:description,
                        category:category,
                        thumbnail: req.file.filename,
                        user: req.user._id,
                    });
                    const savedBlog = await newBlog.save();
                    if(savedBlog){
                    res.status(200).json({message:"Blog added successfully", savedBlog});
                }
                }
                }
        }
        catch(err){
            res.status(500).json({message:err.message})
        }
        
    }
    
    static async getSingleBlog(req, res){
        const {id} = req.params;
        try{
            if(id){
                const fetchBlogbyId = await BlogModel.findById(id);
                if(fetchBlogbyId){
                    res.status(200).json(fetchBlogbyId);
                }
                else{
                    res.status(400).json({message:"Blog not found"});
                }
            }
            else{
                return res.status(400).json({message:"invalid url"});
            }
        }
        catch(err){
            res.status(500).json({message:err.message})
    }
}}

module.exports = BlogController;