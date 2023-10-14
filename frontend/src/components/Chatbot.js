import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Chatbot() {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send user input to the server
    axios
      .post('http://localhost:8080/api/ai/create', { userInput })
      .then((response) => {
        // Handle the response from the server
        setResponse(response.data.response);
        navigate('/portal');
      })
      .catch((error) => {
        console.error('Error sending user input:', error);
      });
  };

  // CSS styles for the input field
  const inputStyle = {
    backgroundColor: '#F5EBE0', // Background color for the input field
  };

  const submitButtonStyle = {
    backgroundColor: '#D5BDAF', // Background color for the submit button
    color: 'white', // Text color
    fontWeight: 'bold', // Make the text bold
  };

  return (
    <div className="container text-center mt-5" >
      <h2 className="mb-4">Chatbot</h2>
      
      {/* Added section with smaller font */}
      <div className="mb-3">
        <p className="small">Example: "I need a waiter on 14 October 2023 from 4pm to 9pm at Ang Mo Kio"</p>
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your request..."
              value={userInput}
              onChange={handleInputChange}
              required
              style={inputStyle}
            />
          </div>
          <button type="submit" className="btn" style={submitButtonStyle}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chatbot;
