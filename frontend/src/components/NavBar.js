import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

// Import your logo image
import logo from "./logo.png"; // Replace with the correct path to your logo image

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  // Function to determine if a given route path is active
  const isRouteActive = (routePath) => {
    return location.pathname.startsWith(routePath);
  };

  // Define inline CSS for the active item (font weight: bold)
  const activeItemStyle = {
    fontWeight: "bold",
  };

  // Define additional spacing between items
  const itemSpacing = {
    marginRight: "20px", // Adjust the value as needed
  };
  const navbarStyle = {
    backgroundColor: "#F5EBE0",
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={navbarStyle}>
      <div className="container">
        {/* Logo */}
        <Link to="/home" className="navbar-brand">
          <img
            src={logo}
            alt="Logo"
            style={{ maxWidth: "80px", marginRight: "10px" }}
          />
        </Link>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li
              className="nav-item"
              style={{
                ...itemSpacing,
                ...(isRouteActive("/portal") ? activeItemStyle : {}),
              }}
            >
              <Link to="/portal" className="nav-link">
                All Listings
              </Link>
            </li>
            <li
              className="nav-item"
              style={{
                ...itemSpacing,
                ...(isRouteActive("/createpost") ? activeItemStyle : {}),
              }}
            >
              <Link to="/createpost" className="nav-link">
                Create Job Posting
              </Link>
            </li>
            <li
              className="nav-item"
              style={{
                ...itemSpacing,
                ...(isRouteActive("/chatbot") ? activeItemStyle : {}),
              }}
            >
              <Link to="/chatbot" className="nav-link">
                Chatbot
              </Link>
            </li>
          </ul>
          <button className="nav-link" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
