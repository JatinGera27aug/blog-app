import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import axiosInstance from '../Services/axiosInstance';
import { Link } from 'react-router-dom';

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const response = await axiosInstance.get('https://blog-app-2bll.onrender.com/api/get/allBlogs');
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchAllBlogs(); // Call the function
  }, []);

  // Helper function to truncate the description
  const truncateDescription = (description, wordLimit) => {
    const words = description.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return description;
  };

  return (
    <>
      <main className="my-5">
        <div className="container shadow-lg p-3" style={{ backgroundColor: '#F4F4F9' }}>
          <section className="text-center">
            <h1 className="mb-5" style={{ color: '#333333' }}>
              <strong>Latest Posts</strong>
            </h1>
            <div className="row">
              {blogs && blogs.length > 0 ? (
                blogs.map((item) => {
                  const truncatedDescription = truncateDescription(item.description, 10); // Limiting to 50 words

                  return (
                    <div key={item._id} className="col-lg-4 col-md-6 mb-4">
                      <div
                        className="card"
                        style={{
                          borderRadius: '10px',
                          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                          transition: 'transform 0.3s ease',
                        }}
                      >
                        <div
                          className="bg-image hover-overlay ripple"
                          data-mdb-ripple-color="light"
                          style={{ borderRadius: '10px' }}
                        >
                          <img
                            src={`https://blog-app-2bll.onrender.com/${item.thumbnail}`}
                            className="img-fluid"
                            alt={item.title}
                            style={{
                              maxHeight: '250px',
                              objectFit: 'cover',
                              borderRadius: '10px',
                            }}
                          />
                          <a href="#!">
                            <div
                              className="mask"
                              style={{
                                backgroundColor: 'rgba(251, 251, 251, 0.15)',
                              }}
                            ></div>
                          </a>
                        </div>
                        <div className="card-body">
                          <h5 className="card-title" style={{ color: '#333333' }}>
                            {item.title}
                          </h5>
                          <p className="card-text" style={{ color: '#666666' }}>
                            {truncatedDescription}
                          </p>
                          <Link
                            to={`/blog/${item._id}`}
                            className="btn"
                            style={{
                              backgroundColor: '#6EC1E4',
                              color: '#FFFFFF',
                              padding: '10px 20px',
                              textDecoration: 'none',
                              border: 'none',
                              transition: 'background-color 0.3s ease',
                            }}
                            onMouseOver={(e) => (e.target.style.backgroundColor = '#5ba4d8')}  // Hover effect
                            onMouseOut={(e) => (e.target.style.backgroundColor = '#6EC1E4')}    // Reset
                          >
                            Read more
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <h2>Loading...</h2>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;
