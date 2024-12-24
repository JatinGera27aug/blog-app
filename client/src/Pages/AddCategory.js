import React, {useState} from 'react';
// import axios from 'axios';
import axiosInstance from '../Services/axiosInstance';
import { useNavigate } from 'react-router-dom';
const AddCategory = () => {
  const navigate = useNavigate();
  const [input,setInput] = useState({
   title:''
  })
  const handleCategory = async (e) => {
    e.preventDefault();
    try {
        const res = await axiosInstance.post('https://blog-app-2bll.onrender.com/api/add/category', input);
        // console.log(res.data);
        alert(res.data.message); // Notify success
        navigate('/'); // Redirect to the home page
    } catch (error) {
        console.error("Error adding category:", error);
        alert(error.response?.data?.message || "An error occurred");
    }
};

  return (
    <>
      <div className="container-shadow">
        <h1 className="text-center my-4">Add a New Category</h1>
        <div className="col-md-12 my-3 d-flex align-items-center justify-content-center">
          <div className="row">
            <form onSubmit={handleCategory}>
              {/* Category Input */}
              <div className="mb-3">
                <label htmlFor="categoryName" className="form-label">
                  Category
                </label>
                <input
                  type="text"
                  name="title"
                  value={input.title}
                  onChange={(e)=>setInput({...input,[e.target.name]:e.target.value})}
                  className="form-control"
                  id="categoryName"
                  placeholder="Enter category name"
                />
              </div>

              {/* Submit Button */}
              <div className="mb-3">
                <button type="submit" className="btn btn-primary btn-block">
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
