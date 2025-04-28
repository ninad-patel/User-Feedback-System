import React, { useEffect, useState } from 'react';
import './dashboard.css';

function average(arr) {
  if (arr.length === 0) {
    return 0;
  }
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum / arr.length;
}

function Dashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [displayedFeedbacks, setDisplayedFeedbacks] = useState([]);
  const [sortField, setSortField] = useState('');
  const [filters, setFilters] = useState({
    feedbackRange: [],
    courses: [],
  });

  useEffect(() => {
    fetch('http://localhost:5000/feedback')
      .then(response => response.json())
      .then(data => {
        setFeedbacks(data);
        setDisplayedFeedbacks(data);
      })
      .catch(error => console.error('Error fetching feedbacks:', error));
  }, []);

  const handleSortChange = (field) => {
    setSortField(field);
    const sorted = [...displayedFeedbacks].sort((a, b) => {
      if (field === 'feedback') {
        return average(b.feedback) - average(a.feedback); // higher feedback first
      }
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    });
    setDisplayedFeedbacks(sorted);
  };

  const handleFilterChange = (type, value) => {
    const updatedFilters = { ...filters };
    if (updatedFilters[type].includes(value)) {
      updatedFilters[type] = updatedFilters[type].filter(item => item !== value);
    } else {
      updatedFilters[type].push(value);
    }
    setFilters(updatedFilters);

    let filtered = [...feedbacks];

    if (updatedFilters.feedbackRange.length > 0) {
      filtered = filtered.filter(fb => {
        const avg = average(fb.feedback);
        return updatedFilters.feedbackRange.some(range => {
          if (range === '0-50') return avg <= 50;
          if (range === '51-75') return avg > 50 && avg <= 75;
          if (range === '76-100') return avg > 75;
          return false;
        });
      });
    }

    if (updatedFilters.courses.length > 0) {
      filtered = filtered.filter(fb => updatedFilters.courses.includes(fb.course));
    }

    setDisplayedFeedbacks(filtered);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <img src="/logo.png" alt="Mixer Academy Logo" className="logo" />
      </nav>

      {/* Dashboard Content */}
      <div className="dashboard-container">
        <h1>Mixer Academy Dashboard</h1>
        {sortField && <p></p>}

        {/* Controls */}
        <div className="controls">
          {/* Sort */}
          <div className="control-item">
            <button className="control-button">Sort By ⬇️</button>
            <div className="dropdown">
              <label><input type="radio" name="sort" onChange={() => handleSortChange('name')} /> Name</label>
              <label><input type="radio" name="sort" onChange={() => handleSortChange('username')} /> Username</label>
              <label><input type="radio" name="sort" onChange={() => handleSortChange('email')} /> Email</label>
              <label><input type="radio" name="sort" onChange={() => handleSortChange('enrollmentId')} /> Enrollment ID</label>
              <label><input type="radio" name="sort" onChange={() => handleSortChange('feedback')} /> Feedback</label>
            </div>
          </div>

          {/* Filter */}
          <div className="control-item">
            <button className="control-button">Filter By ⬇️</button>
            <div className="dropdown">
              <p>Feedback Range:</p>
              <label><input type="checkbox" onChange={() => handleFilterChange('feedbackRange', '0-25')} /> 0-25%</label>
              <label><input type="checkbox" onChange={() => handleFilterChange('feedbackRange', '25-50')} /> 25-50%</label>
              <label><input type="checkbox" onChange={() => handleFilterChange('feedbackRange', '51-75')} /> 51-75%</label>
              <label><input type="checkbox" onChange={() => handleFilterChange('feedbackRange', '76-100')} /> 76-100%</label>

              <hr />

              <p>Courses:</p>
              {/* Add courses as per your backend data */}
                <label><input type="checkbox" onChange={() => handleFilterChange('courses', 'Music Production')} /> Music Production</label>
                <label><input type="checkbox" onChange={() => handleFilterChange('courses', 'Audio Engineering')} /> Audio Engineering</label>
                <label><input type="checkbox" onChange={() => handleFilterChange('courses', 'Mixing and Mastering')} /> Mixing and Mastering</label>
                <label><input type="checkbox" onChange={() => handleFilterChange('courses', 'Background Score')} /> Background Score</label>
                <label><input type="checkbox" onChange={() => handleFilterChange('courses', 'Sound Designing')} /> Sound Designing</label>
                <label><input type="checkbox" onChange={() => handleFilterChange('courses', 'Music Composition')} /> Music Composition</label>
                <label><input type="checkbox" onChange={() => handleFilterChange('courses', 'Song Writing')} /> Song Writing</label>
                <label><input type="checkbox" onChange={() => handleFilterChange('courses', 'Music Arrangement')} /> Music Arrangement</label>
            </div>
          </div>
        </div>

        {/* Table */}
        {displayedFeedbacks.length === 0 ? (
          <p>No feedback submitted yet.</p>
        ) : (
          <table className="feedback-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Enrollment Id</th>
                <th>Course</th>
                <th>Feedback</th>
                <th>Message</th>
                <th>Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {displayedFeedbacks.map((fb) => (
                <tr key={fb._id}>
                  <td>{fb.name}</td>
                  <td>{fb.username}</td>
                  <td>{fb.email}</td>
                  <td>{fb.enrollmentId}</td>
                  <td>{fb.course}</td>
                  <td>{average(fb.feedback)}% Satisfied</td>
                  <td>{fb.message}</td>
                  <td>{new Date(fb.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
