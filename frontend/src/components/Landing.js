import React from 'react';
import { Link } from 'react-router-dom';

// Import your logo image
import logo from './logo.png'; // Replace with the correct path to your logo image

function Landing() {
  const logoStyle = {
    width: '500px', // Adjust the width of the logo
  };

  const pageStyle = {
    backgroundColor: '#EDEDE9', // Set the background color for the entire page
    minHeight: '100vh', // Ensure the page covers the entire viewport height
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const descriptionStyle = {
    fontSize: '1.5rem', // Adjust font size for the description
    lineHeight: '1.6',  // Adjust line height for better readability
    maxWidth: '40rem',  // Limit the maximum width to control horizontal space
    margin: '0 auto',   // Center-align the description text
    marginTop: '2rem', // Add top margin to the description
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2rem', // Add top margin to the button container
  };

  const buttonStyle = {
    fontSize: '1.2rem',
    padding: '1rem 2rem', // Increase padding for larger buttons
    marginRight: '1rem',
    backgroundColor: '#D5BDAF', // Yellow color for "Login" button
    border: 'none',
    color: 'white',
    textDecoration: 'none',
  };


  return (
    <div style={pageStyle}>
      <img src={logo} alt="Logo" style={logoStyle} />
      <p style={descriptionStyle} className="mt-3">
        Our product focuses on shifting the markets away from AI replaceable jobs.
        We believe that we should give opportunities to those who want to establish small businesses.
      </p>
      <div style={buttonContainerStyle}>
        <Link to="/login" className="btn btn-primary m-2" style={buttonStyle}>
          Login
        </Link>
        <Link to="/signup" className="btn btn-secondary m-2" style={buttonStyle}>
          Signup
        </Link>
      </div>
    </div>
  );
}

export default Landing;
