# TeamTask 🚀

### Modern Team Collaboration & Task Management Platform

A full-stack MERN-based team collaboration platform where teams can manage projects, assign tasks, track progress, and collaborate efficiently through a clean modern interface.

Built with scalable architecture, JWT authentication, role-based access control, and a responsive modern UI.

---

# ✨ Features

## 🔐 Authentication & Security

* User Signup & Login
* JWT Authentication
* Protected Routes
* Password Hashing using bcrypt
* Secure API Access

---

## 👥 Team Collaboration

* Create & Manage Teams
* Add Members to Projects
* Remove Members
* Role-Based Permissions
* Team Workflow Management

---

## 📁 Project Management

* Create Projects
* Update Project Details
* Delete Projects
* View Assigned Projects
* Admin & Member Roles

---

## ✅ Task Management

* Create Tasks
* Assign Tasks to Members
* Task Priorities (Low / Medium / High)
* Task Status Management
* Due Date Tracking
* Real-time Task Visibility

---

## 📊 Dashboard Analytics

* Total Tasks
* Completed Tasks
* In Progress Tasks
* Overdue Tasks
* Project Insights
* User Task Tracking

---

## 🎨 Modern UI

* Fully Responsive Layout
* Modern Dark Theme
* Glassmorphism Design
* Smooth User Experience
* Clean Dashboard Interface

---

# 🛠️ Tech Stack

## Frontend

* React.js
* React Router DOM
* Axios
* TailwindCSS

---

## Backend

* Node.js
* Express.js
* JWT Authentication
* bcryptjs
* REST APIs

---

## Database

* MongoDB Atlas
* Mongoose ODM

---

## Deployment

* Railway
---

# 📂 Project Structure

```bash
team-task-manager/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   │
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env
│   └── package.json
│
└── README.md
```

---

# 🔑 Core Functionalities

## Authentication

* Signup
* Login
* JWT Token Authentication
* Protected Routes

---

## Project Management

* Create Projects
* Add Members
* Remove Members
* Role-Based Access

---

## Task Management

* Create Tasks
* Assign Tasks
* Update Task Status
* Delete Member Tasks Automatically
* Priority & Status Handling

---

## Dashboard

* Total Tasks
* Completed Tasks
* In Progress Tasks
* Overdue Tasks
* Team Analytics

---

# ⚡ Installation Guide

## 1️⃣ Clone Repository

```bash
git clone https://github.com/SumnRanjan/team-task-manager.git
```

---

# 🖥️ Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# ⚙️ Backend Setup

```bash
cd backend

npm install

npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

# 🔐 Environment Variables

## Backend `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_connection_url

JWT_SECRET=your_secret_key
```

---

## Frontend `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

---

# 🗄️ Database Models

## User

* Name
* Email
* Password

---

## Project

* Name
* Description
* Members
* Roles
* Created By

---

## Task

* Title
* Description
* Assigned User
* Priority
* Status
* Due Date

---

# 📸 UI Highlights

* Modern Dark UI
* Responsive Layout
* Clean Dashboard
* Team Member Management
* Task Creation Modal
* Smooth User Experience

---

# 🚀 Future Improvements

* Drag & Drop Kanban Board
* Real-Time Notifications
* Team Chat System
* File Upload Support
* Activity Logs
* Email Notifications
* Calendar Integration

---

# 🌐 API Endpoints

## Authentication

```bash
POST /api/auth/signup
POST /api/auth/login
```

---

## Projects

```bash
GET    /api/projects
POST   /api/projects
PUT    /api/projects/:id
DELETE /api/projects/:id
```

---

## Members

```bash
POST   /api/projects/:id/add-member
DELETE /api/projects/:id/remove-member/:userId
```

---

## Tasks

```bash
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
```

---

# 👨‍💻 Author

Built with ❤️ by Suman Ranjan

---

