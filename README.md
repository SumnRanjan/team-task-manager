# 🚀 TeamTask — Team Task Management Platform

A modern full-stack team collaboration and task management platform built using **React, Node.js, Express, and MySQL**.

Users can create projects, assign tasks, manage team members, track progress, and monitor workflow from a clean modern dashboard.

---

# ✨ Features

- 🔐 JWT Authentication
- 👥 Team Collaboration
- 📁 Project Management
- ✅ Task Assignment & Tracking
- 📊 Dashboard Analytics
- 🛡️ Role-Based Access Control
- 📅 Due Dates & Priorities
- 📱 Fully Responsive UI
- 🌙 Modern TailwindCSS Inspired Design

---

# 🛠️ Tech Stack

## Frontend
- React.js
- React Router DOM
- TailwindCSS
- DaisyUI
- Axios

## Backend
- Node.js
- Express.js
- JWT Authentication
- bcrypt.js

## Database
- MySQL

## Deployment
- Railway

---

# 📂 Project Structure

```bash
team-task-manager/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   └── package.json
│
└── README.md
```

---

# 🔑 Core Functionalities

## Authentication
- User Signup
- User Login
- JWT Token Authentication
- Protected Routes

## Project Management
- Create Projects
- Add Team Members
- Remove Members
- Manage Team Workflow

## Task Management
- Create Tasks
- Assign Tasks
- Update Task Status
- Set Due Dates & Priorities

## Dashboard
- Total Tasks
- Completed Tasks
- Overdue Tasks
- Tasks By Status
- Tasks Per User

---

# ⚡ Installation

## Clone Repository

```bash
git clone https://github.com/SumnRanjan/team-task-manager.git
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

# 🔐 Environment Variables

Create `.env` inside backend folder:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=teamtask

JWT_SECRET=your_secret_key
```

---

# 🗄️ Database Tables

- users
- projects
- project_members
- tasks

---

# 📸 UI Highlights

- Dark Modern UI
- TailwindCSS Style Layout
- Glassmorphism Effects
- Responsive Design
- Interactive Dashboard

---

# 🚀 Future Improvements

- Real-time Notifications
- Drag & Drop Tasks
- Team Chat System
- Activity Logs
- File Upload Support
- Kanban Board

---

# 👨‍💻 Author

Built with ❤️ by Suman Ranjan

---
