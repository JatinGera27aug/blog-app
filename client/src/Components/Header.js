import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    alert('logout success')
    navigate('/login');
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {/* Brand */}
        <Link className="navbar-brand ms-4" to="/">
          Jatin's Blog App
        </Link>

        {/* Toggler for Small Screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links and Buttons */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-4 me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-blog">
                Add Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-category">
                Add Category
              </Link>
            </li>
          </ul>

          {/* Login/Logout Section */}
          <div className="d-flex align-items-center">
            {token ? (
              <>
                <span className="navbar-text mx-2">
                  Welcome, <strong>{username}</strong>
                </span>
                <button onClick={handleLogout} className="btn btn-outline-primary mx-2">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="btn btn-primary mx-2">Login</button>
                </Link>
                <Link to="/register">
                  <button className="btn btn-outline-primary mx-2">Register</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
