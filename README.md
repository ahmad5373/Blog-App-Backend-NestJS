# Blog Post Application

A full-stack blog application built with **NestJS** for the backend, **PostgreSQL** as the database, and **TypeORM** for ORM. The application includes authentication, user management, and CRUD operations for posts and comments.

## Features
- **User Registration and Login** with JWT Authentication
- **CRUD Operations** for Blog Posts
- **CRUD Operations** for Comments on Posts
- **Protected Routes** for creating, updating, and deleting posts and comments
- **Open Routes** for viewing posts and comments

## Installation

1. Clone the repository:
   git clone https://github.com/your-username/blog-app.git
   cd blog-app-backend
Install dependencies:


npm install
Create a .env file in the root of the project and configure your environment variables:

makefile
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=your_database_user
DATABASE_PASSWORD=your_database_password
DATABASE_NAME=your_database_name
JWT_SECRET=your_jwt_secret
Run database migrations:


# Start the application:
npm run start:dev

## API Endpoints
Authentication
1. Register a New User
URL: /auth/register
Method: POST
Protected: No
Body{
  "username": "testuser",
  "email": "testuser@gmail.com",
  "password": "password123"
}

2. User Login
URL: /auth/login
Method: POST
Protected: No
Body{
  "email": "testuser@gmail.com",
  "password": "password123"
}

Posts
1. Create a New Post
URL: /posts/create
Method: POST
Protected: Yes (JWT required)
Body{
  "title": "My First Post",
  "content": "This is the content of the first post."
}

2. Get All Posts
URL: /posts
Method: GET
Protected: No

3. Update a Post
URL: /posts/:id
Method: PUT
Protected: Yes (JWT required)
Body{
  "title": "Updated Post Title",
  "content": "Updated content for the post."
}

4. Delete a Post
URL: /posts/:id
Method: DELETE
Protected: Yes (JWT required)

Comments
1. Add a Comment to a Post
URL: /comments/create
Method: POST
Protected: Yes (JWT required)
Body{
  "post": 1,
  "content": "This is a comment on the first post."
}

2. Get Comments for a Post
URL: /comments/post/:postId
Method: GET
Protected: No

3. Update a Comment
URL: /comments/:id
Method: PUT
Protected: Yes (JWT required)
Body{
  "content": "Updated comment content."
}

4. Delete a Comment
URL: /comments/:id
Method: DELETE
Protected: Yes (JWT required)


Authentication
All protected routes require a JWT token to be passed in the Authorization header as a Bearer token.

Authorization: Bearer your_jwt_token
Error Handling
401 Unauthorized: Returned when a request is made to a protected route without a valid token.
404 Not Found: Returned when a requested resource (post or comment) is not found.
500 Internal Server Error: Returned when there is a server-side issue.
Testing the API
You can use Postman to test the API endpoints. Don't forget to include the JWT token for protected routes.

License
This project is licensed under the MIT License.