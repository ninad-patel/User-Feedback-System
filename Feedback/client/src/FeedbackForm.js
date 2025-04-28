import React, { useState } from 'react';
import './feedback.css';

function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    enrollmentId: '',
    course: '',
    feedback: Array(12).fill(0),
    message: ''
  });

  const courses = [
    'Music Production',
    'Audio Engineering',
    'Mixing and Mastering',
    'Background Score',
    'Sound Designing',
    'Music Composition',
    'Song Writing',
    'Music Arrangement'
  ];

  const questions = [
    'How satisfied are you with the content of the course?',
    'Were all topics properly covered during the course?',
    'How would you rate the instructor?',
    'Were all doubts resolved during the class?',
    'How organized was the course structure?',
    'Was the learning environment engaging?',
    'How helpful were the provided resources?',
    'Was the platform easy to navigate?',
    'Did the course meet your expectations?',
    'Was the course duration appropriate?',
    'How effective were the practical sessions?',
    'Would you recommend this course to others?'
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSliderChange = (index, value) => {
    const updated = [...formData.feedback];
    updated[index] = value;
    setFormData({ ...formData, feedback: updated });
  };

  const [errors, setErrors] = useState({});

    const validateForm = () => {
    let tempErrors = {};

    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.username) tempErrors.username = "Username is required";
    if (!formData.email) tempErrors.email = "Email is required";
    if (!formData.enrollmentId) tempErrors.enrollmentId = "Enrollment ID is required";
    if (!formData.course) tempErrors.course = "Course selection is required";

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/feedback', {  // <-- use 5000, not 3000
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
        alert('Feedback submitted successfully!');
  
        // Clear form after successful submission
        setFormData({
          name: '',
          username: '',
          email: '',
          enrollmentId: '',
          course: '',
          feedback: Array(12).fill(0),
          message: ''
        });
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        alert('Failed to submit feedback.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('An error occurred while submitting feedback.');
    }
  };
  
  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <img src="/logo.png" alt="Mixer Academy Logo" className="logo" />
      </nav>

      {/* Form */}
      <form onSubmit={handleSubmit} className="feedback-form">
        {/* Title */}
        <h1 className="form-title">Mixer Academy Feedback Form</h1>

        <label>Name:<span className="asterisk">*</span></label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        {errors.name && <p className="error">{errors.name}</p>}

        <label>Username:<span className="asterisk">*</span></label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
        {errors.username && <p className="error">{errors.username}</p>}

        <label>Email:<span className="asterisk">*</span></label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <p className="error">{errors.email}</p>}

        <label>Enrollment Id:<span className="asterisk">*</span></label>
        <input type="text" name="enrollmentId" value={formData.enrollmentId} onChange={handleChange} />
        {errors.enrollmentId && <p className="error">{errors.enrollmentId}</p>}

        <label>Course:<span className="asterisk">*</span></label>
        <select name="course" value={formData.course} onChange={handleChange}>
        <option value="">Select</option>
        {courses.map((course, idx) => (
            <option key={idx} value={course}>{course}</option>
        ))}
        </select>
        {errors.course && <p className="error">{errors.course}</p>}


        {questions.map((q, idx) => (
          <div key={idx} className="slider-question">
            <label>{q}</label>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.feedback[idx]}
              onChange={(e) => handleSliderChange(idx, parseInt(e.target.value))}
            />
            <span>{formData.feedback[idx]}%</span>
          </div>
        ))}

        <label>Any Additional feedback or message:</label>
        <textarea name="message" rows="4" value={formData.message} onChange={handleChange}></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FeedbackForm;
