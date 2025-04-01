# User Management API

A RESTful API for user profile management built with Node.js, Express, and MongoDB.

## Overview

This API provides endpoints for user registration, authentication, profile management, and more. It includes JWT-based authentication, password hashing, and secure user data handling.

## Features

- User registration with validation
- Secure authentication with JWT
- Password encryption with bcrypt
- Profile management (view and update)
- MongoDB integration
- Security measures with Helmet

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token for authentication
- **bcrypt** - Password hashing
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger

## Directory Structure

```
└── harry-urek-binbag-be/
    ├── README.md
    ├── app.js             # Express application setup
    ├── package.json       # Project dependencies
    ├── server.js          # Server initialization
    ├── controllers/       # Business logic
    │   └── userController.js
    ├── db/                # Database connection
    │   └── mongoose.js
    ├── middleware/        # Custom middleware
    │   ├── auth.js
    │   └── errorHandler.js
    ├── models/            # Database schemas
    │   └── userModel.js
    └── routes/            # API endpoints
        └── userRoutes.js
```

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/username/harry-urek-binbag-be.git
   cd harry-urek-binbag-be
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

## API Endpoints

### User Routes

| Method | Endpoint | Description | Authentication Required |
|--------|----------|-------------|------------------------|
| GET | / | Welcome message | No |
| POST | /api/v1/user/register | Register a new user | No |
| POST | /api/v1/user/login | User login | No |
| GET | /api/v1/user/profile | Get user profile | Yes |
| PUT | /api/v1/user/profile | Update user profile | Yes |

### Request & Response Examples

#### Register a New User

**Request:**
```http
POST /api/v1/user/register
Content-Type: application/json

{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword",
  "address": "123 Main St",
  "bio": "Software developer",
  "profilePicture": "https://example.com/profile.jpg"
}
```

**Response:**
```json
{
  "user": {
    "_id": "60d21b4667d0d8992e610c85",
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "address": "123 Main St",
    "bio": "Software developer",
    "profilePicture": "https://example.com/profile.jpg",
    "createdAt": "2023-06-23T10:00:00.000Z"
  }
}
```

#### User Login

**Request:**
```http
POST /api/v1/user/login
Content-Type: application/json

{
  "usernameOrEmail": "johndoe",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDIxYjQ2NjdkMGQ4OTkyZTYxMGM4NSIsImlhdCI6MTYyNDQ1NTYwMCwiZXhwIjoxNjI0NDU5MjAwfQ.example_token"
}
```

#### Get User Profile

**Request:**
```http
GET /api/v1/user/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDIxYjQ2NjdkMGQ4OTkyZTYxMGM4NSIsImlhdCI6MTYyNDQ1NTYwMCwiZXhwIjoxNjI0NDU5MjAwfQ.example_token
```

**Response:**
```json
{
  "user": {
    "_id": "60d21b4667d0d8992e610c85",
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "address": "123 Main St",
    "bio": "Software developer",
    "profilePicture": "https://example.com/profile.jpg",
    "createdAt": "2023-06-23T10:00:00.000Z"
  }
}
```

#### Update User Profile

**Request:**
```http
PUT /api/v1/user/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDIxYjQ2NjdkMGQ4OTkyZTYxMGM4NSIsImlhdCI6MTYyNDQ1NTYwMCwiZXhwIjoxNjI0NDU5MjAwfQ.example_token
Content-Type: application/json

{
  "name": "John Smith",
  "email": "john.smith@example.com",
  "address": "456 Oak Ave",
  "bio": "Senior Software Engineer",
  "profilePicture": "https://example.com/new-profile.jpg"
}
```

**Response:**
```json
{
  "user": {
    "_id": "60d21b4667d0d8992e610c85",
    "name": "John Smith",
    "username": "johndoe",
    "email": "john.smith@example.com",
    "address": "456 Oak Ave",
    "bio": "Senior Software Engineer",
    "profilePicture": "https://example.com/new-profile.jpg",
    "createdAt": "2023-06-23T10:00:00.000Z"
  }
}
```

## Authentication

The API uses JWT (JSON Web Token) for authentication. To access protected routes, include the token in the Authorization header:

```
Authorization: Bearer your_jwt_token
```

The token is obtained by logging in through the `/api/v1/user/login` endpoint and is valid for 1 hour.

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `200` - Success
- `201` - Resource created
- `400` - Bad request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not found
- `500` - Server error

## Data Validation

User data is validated using Mongoose schemas with the following requirements:

- **username**: Minimum 4 characters, unique
- **email**: Valid email format, unique
- **password**: Minimum 6 characters
- **bio**: Maximum 500 characters


## Author

harry-urek