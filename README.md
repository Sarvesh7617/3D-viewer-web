# 3D Model Viewer (MERN)

A full-stack MERN application that allows users to upload, manage, and view **3D GLB models** directly in the browser using **Three.js**. The application includes an **Admin Dashboard** for managing models and a **Viewer** for rendering uploaded GLB files.

---

## ScreenShots

### Home

- List of uploaded models
- Interactive 3D viewer


<img width="959" height="479" alt="Screenshot 2026-07-12 010035" src="https://github.com/user-attachments/assets/d1d6b81c-4844-4288-a11b-027a0c8bf1dc" />

---

### Dashboard

- Upload model
- Edit title
- Delete model
- View uploaded models


<img width="959" height="476" alt="Screenshot 2026-07-12 010053" src="https://github.com/user-attachments/assets/df046e8c-a92a-4dde-be34-ff9cdef11235" />

---

## Features

### User Features

- View all uploaded 3D models
- Render GLB models using Three.js
- Orbit controls (Rotate, Zoom, Pan)
- Automatic model centering
- Automatic model scaling
- Responsive 3D viewer

### Admin Dashboard

- Upload GLB models
- Store model information in MongoDB
- Edit model title
- Delete model
- Display uploaded models list

---

## Tech Stack

### Frontend

- React
- React Router DOM
- Axios
- Three.js
- GLTFLoader
- OrbitControls
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- CORS

---

## Project Structure

```
project
│
├── backend/src/
│   │       ├── controllers
│   │       │   └──model.controller.js
│   │       ├── db
│   │       │   └──index.js
│   │       ├── middlewares
│   │       │   └── upload.js
│   │       ├── models
│   │       │   └──glb.model.js
│   │       ├── routes
│   │       │   └──model.route.js
│   │       ├── utils
│   │       │   ├── ApiResponse
│   │       │   ├── asyncHandler
│   │       │   └── ApiError
│   │       └── modelupload
│   ├── app.js
│   ├── constant.js
│   └── index.js
│
└── frontend/src/
    │         ├── components
    │         │   └── Navbar
    │         ├── pages
    │         │   ├── Dashboard
    │         │   └── Home
    │         │ 
    │         ├── helper
    │         │   └──axiosInstance
    │         ├── config
    │         │   └──config.js
    │         ├── App.jsx
    │         └── main.jsx
    │
    ├── index.html
    └── .env
       
```

---

## 🚀 Live Demo

[Click here to visit project](https://3-d-viewer-web-mu.vercel.app)

Backend API: https://threed-viewer-web-y5i8.onrender.com

---

# Installation

## 1. Clone Repository

```bash
git clone https://github.com/Sarvesh7617/3D-viewer-web.git
```

---

## Backend Setup

Move to backend directory

```bash
cd backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=4000

MONGOOSE_URL=your_mongodb_connection_string

CORS_ORIGIN=http://localhost:5173
```

Run backend

```bash
npm run dev
```

---

## Frontend Setup

Move to frontend directory

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Create `.env`

```env
VITE_BACKEND_URL=http://localhost:4000/api/v1
```

Run frontend

```bash
npm run dev
```

---

# API Endpoints

## Upload Model

```
POST /api/v1/upload
```

Form Data

```
title
model (GLB File)
```

---

## Get All Models

```
GET /api/v1/get-models
```

---

## Update Model

```
PUT /api/v1/models/:id
```

Body

```json
{
  "title": "Updated Model Title"
}
```

---

## Delete Model

```
DELETE /api/v1/models/:id
```

---

# Database Schema

```javascript
{
    title: String,
    filePath: String,
    createdAt: Date,
    updatedAt: Date
}
```

---

# How It Works

### Upload

- Admin uploads a GLB file.
- Multer stores the file inside the `modelupload` directory.
- MongoDB stores the model title and file path.

### View

- Home page fetches all models.
- User selects a model.
- Three.js loads the GLB using `GLTFLoader`.
- Model is automatically centered and scaled.
- OrbitControls provide interactive navigation.

### Manage

Admin can:

- Upload models
- Edit model title
- Delete models

---

# Three.js Features

- Perspective Camera
- Ambient Light
- Directional Light
- Orbit Controls
- Auto Scaling
- Auto Centering
- Responsive Canvas
- GLTFLoader

---

# Future Improvements

- User authentication
- JWT-based admin login
- Cloud storage (AWS S3 / Cloudinary)
- Drag-and-drop upload
- Model search
- Pagination
- Model thumbnails
- Multiple file uploads
- Loading progress indicator
- Model metadata (size, upload date, author)

---

# Author

**Sarvesh**

MERN Stack Developer
