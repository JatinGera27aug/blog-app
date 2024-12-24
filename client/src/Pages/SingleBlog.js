import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./SingleBlog.css"; // Custom CSS for styles

const SingleBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState({});

  useEffect(() => {
    const getBlog = async () => {
      try {
        const res = await axios.get(
          `https://blog-app-2bll.onrender.com/api/get/blog/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBlog(res.data);
      } catch (error) {
        console.error("Error fetching blog:", error.response?.data?.message);
      }
    };
    getBlog();
  }, [id]);

  return (
    <div className="container blog-container shadow-lg p-5 my-5 rounded bg-light">
      <div className="text-center mb-4">
        <h1 className="blog-title">{blog.title}</h1>
        <p className="blog-date">Published on: {blog.publishedDate || "N/A"}</p>
      </div>

      <div className="d-flex justify-content-center mb-4">
        <img
          src={`https://blog-app-2bll.onrender.com/${blog.thumbnail}`}
          className="img-fluid blog-thumbnail"
          alt={blog.title || "Blog Thumbnail"}
        />
      </div>

      <div className="blog-description mb-4">
        <p>{blog.description}</p>
      </div>

      <div className="text-center">
        <button
          onClick={() => navigate("/")}
          className="btn btn-primary btn-lg btn-hover blog-back-btn"
        >
          BACK TO POSTS
        </button>
      </div>
    </div>
  );
};

export default SingleBlog;
