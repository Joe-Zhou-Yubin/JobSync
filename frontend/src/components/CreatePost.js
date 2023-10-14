import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreatePost() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    description: '',
    jobType: '',
    location: '',
    start: '',
    end: '',
  });

  // CSS styles for the form container
  const formContainerStyle = {
    backgroundColor: '#F5EBE0', // Background color for the form container
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    marginTop: '20px',
  };

  // CSS styles for form elements
  const formElementStyle = {
    marginBottom: '20px',
  };

  // CSS styles for the form submit button
  const submitButtonStyle = {
    backgroundColor: '#D5BDAF', // Background color for the submit button
    color: 'white', // Text color
    fontWeight: 'bold', // Make the text bold
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Format date and time values to match "yyyy-MM-dd HH:mm:ss" format
    const formattedFormData = {
      ...formData,
      start: `${formData.start.replace('T', ' ')}:00`, // Replace 'T' with ' ' and add seconds
      end: `${formData.end.replace('T', ' ')}:00`,     // Replace 'T' with ' ' and add seconds
    };
  
    // Make an HTTP POST request to send the form data to the server
    axios
      .post('http://localhost:8080/api/post/create', formattedFormData)
      .then((response) => {
        // Handle success, e.g., show a success message
        console.log('Job posting created:', response.data);
        navigate('/home');
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error('Error creating job posting:', error);
      });
  };

  return (
    <div className="container mt-4 mb-4">
      <h2 className="text-center mb-4 mt-4">Create Job Posting</h2>
      <form onSubmit={handleSubmit} style={formContainerStyle}>
        <div className="form-group mt-2" style={formElementStyle}>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mt-2" style={formElementStyle}>
          <label htmlFor="jobType">Job Type:</label>
          <input
            type="text"
            name="jobType"
            value={formData.jobType}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mt-2" style={formElementStyle}>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mt-2" style={formElementStyle}>
          <label htmlFor="start">Start Date and Time:</label>
          <input
            type="datetime-local"
            name="start"
            value={formData.start}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mt-2" style={formElementStyle}>
          <label htmlFor="end">End Date and Time:</label>
          <input
            type="datetime-local"
            name="end"
            value={formData.end}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn mt-2" style={submitButtonStyle}>
          Create Job Posting
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
