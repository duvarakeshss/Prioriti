# Prioriti - Task Manager

## Overview
Prioriti is a full-stack task management application built using Express.js, React.js, and MongoDB. It allows users to create tasks, set priorities, and track deadlines while ensuring secure authentication through JWT.

## Features
- **Task Management:** Create, update, and delete tasks.
- **Prioritization:** Assign priority levels to tasks.
- **Deadline Tracking:** Set and monitor task deadlines.
- **JWT Authentication:** Secure user authentication and session management.
- **User-Friendly Interface:** Clean and intuitive UI for better productivity.

## Tech Stack
- **Frontend:** React.js
- **Backend:** Express.js, Node.js
- **Database:** MongoDB
- **Authentication:** JSON Web Token (JWT)

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB

### Setup Instructions
1. **Clone the Repository:**
   ```sh
   git clone https://github.com/yourusername/prioriti.git
   cd prioriti
   ```

2. **Backend Setup:**
   ```sh
   cd backend
   npm install
   nodemon run server
   ```

3. **Frontend Setup:**
   ```sh
   cd TaskManager-Frontend
   npm install
   npm run dev
   ```

4. **Environment Variables:**
   Create a `.env` file in the `server` directory and configure:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

## Usage
- Register/Login to access the task manager.
- Add, edit, prioritize, and delete tasks.
- Track deadlines and manage tasks efficiently.

