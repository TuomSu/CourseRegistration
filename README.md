# Course Registration App
A MERN stack (MongoDB, Express, React, Node.js) application for managing courses and participant registrations.

## Features 
User Roles: Admin & Visitor
### Admin Functionalities:
Add new courses with images 
View and manage participants 

### Visitor Functionalities:
View available courses 
Register for a course 
User Interface: Material-UI for modern UX

## Tech Stack 
- Frontend: React (Vite), Material-UI
- Backend: Node.js, Express.js
- Database: MongoDB, Mongoose
- Authentication: JSON Web Token (JWT)
- File Uploads: Multer

## API Endpoints

| Method | Endpoint                 | Description                 | Access  |
|--------|--------------------------|-----------------------------|---------|
| POST   | `/api/auth/login`        | Admin login                 | Public  |
| GET    | `/api/courses`           | Get all courses             | Public  |
| GET    | `/api/courses/:id`       | Get course by ID            | Public  |
| POST   | `/api/courses`           | Add a new course            | Admin   |
| POST   | `/api/register`          | Register for a course       | Public  |
| GET    | `/api/courses/:id/participants` | Get participants for a course | Admin |

## Future Improvements 
- Authentication: Login system with token-based authentication, only to designated admins (currently  it is possible to register as a 'new admin', which simulates the possibility to create an account)
- Email notifications for registrations
- Course filtering and search
