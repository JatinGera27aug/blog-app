import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import axiosInstance from '../Services/axiosInstance';

const AddBlog = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    description: "",
    category: "",
  });

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchAllCategories = async () => {
        try {
            const res = await axiosInstance.get("https://blog-app-2bll.onrender.com/api/get/categories");
            setCategories(res.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
            alert(error.response?.data?.message || "An error occurred while fetching categories.");
        }
    };

    fetchAllCategories(); // Call the function
}, []); 

  const [file, setFile] = useState([]);

  // Creating form data
  const formData = new FormData();
  formData.append("title", input.title);
  formData.append("description", input.description);
  formData.append("category", input.category);
  formData.append("thumbnail", file);

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axiosInstance.post("https://blog-app-2bll.onrender.com/api/add/Blog", formData);
        console.log(res.data);
        alert(res.data.message); // Notify the user of success
        navigate("/"); // Redirect to the home page
    } catch (error) {
        console.error("Error adding blog:", error);
        alert(error.response?.data?.message || "An error occurred while adding the blog.");
    }

    // console.log("Form data:", {
    //     title: input.title,
    //     description: input.description,
    //     category: input.category,
    //     thumbnail: file,
    // });
};

  return (
    <>
      <div className="container p-4 mt-5" style={{ backgroundColor: '#F8F9FA', borderRadius: '8px', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1 className="text-center my-4" style={{ color: '#333333' }}>Add a New Blog</h1>
        <div className="col-md-12 my-3 d-flex align-items-center justify-content-center">
          <div className="row" style={{ flex: 1 }}>
            <form onSubmit={handlesubmit} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              {/* Title Input */}
              <div className="mb-3">
                <label htmlFor="blogTitle" className="form-label" style={{ color: '#495057' }}>
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={input.title}
                  onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                  className="form-control"
                  id="blogTitle"
                  placeholder="Enter blog title"
                  style={{ borderRadius: '5px', padding: '10px' }}
                />
              </div>

              {/* Category Select */}
              <div className="mb-3">
                <label htmlFor="blogCategory" className="form-label" style={{ color: '#495057' }}>
                  Category
                </label>
                <select
                  name="category"
                  className="form-control"
                  id="blogCategory"
                  value={input.category} // Bind to the state
                  onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })} // Update state
                  style={{ borderRadius: '5px', padding: '10px' }}
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  {categories.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description Textarea */}
              <div className="mb-3">
                <label htmlFor="blogDescription" className="form-label" style={{ color: '#495057' }}>
                  Description
                </label>
                <textarea
                  name="description"
                  value={input.description}
                  onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                  className="form-control"
                  id="blogDescription"
                  placeholder="Enter blog description"
                  rows="5"
                  style={{
                    borderRadius: '5px',
                    padding: '10px',
                    minHeight: '150px', // Minimum height for the textarea
                    resize: 'none', // Prevent resizing
                    transition: 'height 0.2s ease', // Smooth transition for resizing
                    overflowY: 'auto', // Enable scroll when needed
                  }}
                ></textarea>
              </div>

              {/* Thumbnail Upload */}
              <div className="mb-3">
                <label htmlFor="blogThumbnail" className="form-label" style={{ color: '#495057' }}>
                  Thumbnail
                </label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  name="thumbnail"
                  className="form-control"
                  id="blogThumbnail"
                  style={{ borderRadius: '5px' }}
                />
              </div>

              {/* Submit Button */}
              <div className="mb-3">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  style={{
                    backgroundColor: '#007BFF',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    fontSize: '16px',
                  }}
                >
                  Add Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
