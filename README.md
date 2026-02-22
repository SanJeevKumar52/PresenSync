# Mini Attendance + Task Management System

A full-stack web application that allows users to:

- Signup/Login using JWT authentication
- Mark daily attendance (no duplicate per day)
- Create, update, and manage tasks
- Securely access protected routes

Built with production-level structure, validation, and security practices.

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt (password hashing)
- express-validator
- helmet (security)
- express-rate-limit
- dotenv

### Frontend
- React (Vite)
- React Router DOM
- Axios

---

## Project Structure

```
mini-attendance-system/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── pages/
│   │   ├── components/
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

## Authentication Flow

- User registers using `/api/auth/signup`
- Password is hashed using bcrypt
- JWT token generated (expires in 7 days)
- Token stored in frontend localStorage
- Protected routes use `Authorization: Bearer <token>`

---

## Attendance System

- Endpoint: `POST /api/attendance/mark`
- Attendance is stored with:
  - userId
  - date (start of day)
- Compound index used:

```js
attendanceSchema.index({ user: 1, date: 1 }, { unique: true });
```

This ensures:
- No duplicate attendance per day
- Database-level enforcement

---

## 📋 Task Management

### Create Task
`POST /api/tasks`

### Get Tasks
`GET /api/tasks?page=1`

### Update Task
`PUT /api/tasks/:id`

### Features:
- Only owner can update task
- Status enum: `pending | completed`
- Pagination implemented
- Ownership validation enforced

---

## 🛡️ Security Measures

- Password hashing (bcrypt, salt rounds 12)
- JWT token authentication
- Protected routes middleware
- Helmet security headers
- Rate limiting (100 requests / 15 min)
- Input validation (express-validator)
- Environment variables (.env)
- No hardcoded credentials
- Password excluded from responses

---

## 🗄️ Database Schema Design

### Users

| Field | Type |
|-------|------|
| name | String |
| email | String (unique) |
| password | String (hashed) |
| timestamps | Yes |

### Attendance

| Field | Type |
|-------|------|
| user | ObjectId (ref: User) |
| date | Date |
| timestamps | Yes |

**Compound Unique Index:**
```js
(user, date)
```

### Tasks

| Field | Type |
|-------|------|
| user | ObjectId (ref: User) |
| title | String |
| description | String |
| status | Enum (pending/completed) |
| timestamps | Yes |

---

## ⚙️ Setup Instructions

### Clone Repository

```bash
git clone <your-repo-url>
cd mini-attendance-system
```

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

Run backend:

```bash
npm run dev
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:
```
http://localhost:5173
```

---

## 🌐 API Endpoints

### Auth
- `POST /api/auth/signup`
- `POST /api/auth/login`

### Attendance
- `POST /api/attendance/mark`
- `GET /api/attendance`

### Tasks
- `POST /api/tasks`
- `GET /api/tasks?page=1`
- `PUT /api/tasks/:id`

---

## Deployment

### Backend can be deployed on:
- Render
- AWS EC2
- Railway
- GCP

### Frontend can be deployed on:
- Vercel
- Netlify

---

## Evaluation Highlights

- Clean API structure
- Proper DB design
- DB-level duplicate prevention
- Secure authentication
- Ownership-based authorization
- Production-ready folder structure
- Clean commit history
- Proper README documentation

---

## 📎 Author

**Sanjeev Kumar**  
Full Stack Developer (MERN)

---

## 📄 License

This project is created for technical evaluation purposes.

---

