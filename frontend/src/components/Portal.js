import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Import your logo image
import logo from './logo.png'; // Replace with the correct path to your logo image

function Portal() {
  const headingStyle = {
    fontWeight: 'bold', // Make text bold
    fontSize: '2.5rem', // Adjust font size for the heading
    marginTop: '2rem', // Add top margin to the heading
  };

  const cardContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: '2rem', // Add top margin to the card container
  };

  const cardStyle = {
    width: '300px',
    padding: '2rem',
    margin: '1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    textAlign: 'center',
    textDecoration: 'none',
    cursor: 'pointer', // Add pointer cursor to indicate interactivity
    backgroundColor: '#F5EBE0', // Background color for cards
    color: '#333', // Text color for cards
  };

  const [isReloading, setIsReloading] = useState(false);

  // Reload the page with a delay when a card is clicked
  const handleCardClick = () => {
    setIsReloading(true);
    setTimeout(() => {
      window.location.reload();
    }, 1000); // Delay in milliseconds (e.g., 1000ms or 1 second)
  };

  return (
    <div className="container text-center mt-5" >
      <img src={logo} alt="Logo" style={{ width: '400px' }} />
      <div style={cardContainerStyle}>
        <Link
          to="/build-business"
          className="card"
          style={cardStyle}
          onClick={handleCardClick} // Reload the page on card click
        >
          <h3>Build a Business</h3>
          <p>Create and grow your own business</p>
        </Link>
        <Link
          to="/portal"
          className="card"
          style={cardStyle}
          onClick={handleCardClick} // Reload the page on card click
        >
          <h3>Job Portal</h3>
          <p>Find and apply for jobs</p>
        </Link>
        <Link
          to="/my-profile"
          className="card"
          style={cardStyle}
          onClick={handleCardClick} // Reload the page on card click
        >
          <h3>My Profile</h3>
          <p>View and manage your profile</p>
        </Link>
      </div>
    </div>
  );
}

export default Portal;
