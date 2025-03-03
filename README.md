# Backend Books

## Features

- User authentication (register, login, logout)
- Book management (CRUD operations)
- Middleware for authentication and authorization

## Setup Instructions

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
.  
= src
== config
=== database.js

3. Set up environment variables:
   Create a `.env.development` file in the backend directory with the following content:
   ```bash
   PORT=
   DB_HOST=
   DB_NAME=
   DB_USER=
   DB_PASS=
   JWT_SECRET=
   NODE_ENV=
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

## Usage

- The backend server will run on `http://localhost:5000`.
- Use this URL for backend API requests.

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `POST /api/auth/logout` - Logout a user

### Books

- `POST /api/books` - Create a new book (requires authentication)
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get a book by ID
- `PUT /api/books/:id` - Update a book by ID (requires authentication)
- `DELETE /api/books/:id` - Delete a book by ID (requires authentication)
- `PATCH /api/books/:id/recover` - Recover a deleted book by ID (requires authentication)

## License

This project is licensed under the MIT License.
