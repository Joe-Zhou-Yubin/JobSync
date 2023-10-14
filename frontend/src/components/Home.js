import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import axios from "axios";

function Home() {
  const [jobPostings, setJobPostings] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    description: "",
    location: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    // Fetch the list of job postings from the API
    axios
      .get("http://localhost:8080/api/post/list")
      .then((response) => {
        setJobPostings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching job postings:", error);
      });
  }, []);

  // Handle changes in the search input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Format date values to match "YYYY-MM-DD" format
    if (name === "startDate" || name === "endDate") {
      const date = new Date(value);
      const formattedDate = date.toISOString().split("T")[0];
      setSearchCriteria({ ...searchCriteria, [name]: formattedDate });
    } else {
      setSearchCriteria({ ...searchCriteria, [name]: value });
    }
  };

  // Reset the filter criteria to their initial state
  const handleReset = () => {
    setSearchCriteria({
      description: "",
      location: "",
      startDate: "",
      endDate: "",
    });
  };

  // Filter job postings based on search criteria
  const filteredJobPostings = jobPostings.filter((posting) => {
    const { description, location, start, end } = posting;
    const {
      description: searchDescription,
      location: searchLocation,
      startDate,
      endDate,
    } = searchCriteria;

    return (
      description.toLowerCase().includes(searchDescription.toLowerCase()) &&
      location.toLowerCase().includes(searchLocation.toLowerCase()) &&
      (startDate === "" || start.startsWith(startDate)) &&
      (endDate === "" || end.startsWith(endDate))
    );
  });

  // CSS styles for cards
  const cardStyle = {
    backgroundColor: "#F5EBE0", // Background color for cards
    border: "1px solid #ddd",
    borderRadius: "8px",
    marginBottom: "20px",
  };

  // CSS styles for input fields
  const inputStyle = {
    backgroundColor: "#E3E3DD", // Background color for input fields
  };

  return (
    <div className="container">
    
      <h2 className="text-center mb-4 mt-4">Job Postings</h2>

      {/* Search Criteria Input Fields */}
      <div className="row mb-4">
        <div className="col-md-3">
          <input
            type="text"
            name="description"
            value={searchCriteria.description}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Description"
            style={inputStyle}
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            name="location"
            value={searchCriteria.location}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Location"
            style={inputStyle}
          />
        </div>
        <div className="col-md-2">
          <input
            type="date"
            name="startDate"
            value={searchCriteria.startDate}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Start Date"
            style={inputStyle}
          />
        </div>
        <div className="col-md-2">
          <input
            type="date"
            name="endDate"
            value={searchCriteria.endDate}
            onChange={handleInputChange}
            className="form-control"
            placeholder="End Date"
            style={inputStyle}
          />
        </div>
        {/* Reset Button */}
        <div className="col-md-2 text-center">
          <button className="btn btn-secondary" onClick={handleReset}>
            Reset Filters
          </button>
        </div>
      </div>

      <div className="row">
        {filteredJobPostings.map((posting) => (
          <div className="col-md-4 mb-4" key={posting.id}>
            <div className="card" style={cardStyle}>
              <div className="card-body">
                <h5 className="card-title">{posting.jobType}</h5>
                <p className="card-text">{posting.description}</p>
                <p className="card-text">
                  <strong>Location:</strong> {posting.location}
                </p>
                <p className="card-text">
                  <strong>Start Date:</strong>{" "}
                  {new Date(posting.start).toLocaleDateString()}{" "}
                  {new Date(posting.start).toLocaleTimeString()}
                </p>
                <p className="card-text">
                  <strong>End Date:</strong>{" "}
                  {new Date(posting.end).toLocaleDateString()}{" "}
                  {new Date(posting.end).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
