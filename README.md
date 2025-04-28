# User-Feedback-System

Project Overview

This is a User Feedback System built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to submit feedback for different courses offered by an e-learning platform and enables admins to view, sort, and filter these feedbacks through a dashboard interface.

There are two main roles in the system:
1. User: Can access the feedback form and submit their feedback.
2. Admin: Can access the dashboard to view submitted feedbacks, sort them, and apply filters.

Steps to Run this project.

Step 1. Clone from GitHub repository

Step 2. Install MongoDB and Ensure the Mongo DB Server is started -- To ensure the server is on, Open terminal and paste "sudo mongod --dbpath=your_path_of_db"

Step 3. Open the project in VScode and install all the dependencies using "npm install".

Step 4. Open Terminal in VScode and split them. -- In first terminal :- cd client -- In Second terminal :- cd server

Step 5. Run the application using "npm start" in both the terminals.

Feedback form is at http://localhost:3000/ and dashboard is at http://localhost:3000/dashboard.

Additionally, data stored in database can se seen in json format at http://localhost:5000/feedback.
