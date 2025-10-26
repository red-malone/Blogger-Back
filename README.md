# Blog API

A RESTful API built with the MEAN stack (MongoDB, Express.js, Angular, Node.js) for managing blog posts and users.

## Features

- User authentication and authorization using JWT
- CRUD operations for blog posts
- User management
- Error handling middleware
- Security features with Helmet
- Request logging with Morgan

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/red-malone/Blogger-Back.git
cd Blogger-Back
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (create a `.env` file in the root directory):
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

## Project Structure

```
src/
├── config/           # Configuration files
├── controller/       # Route controllers
├── database/        # Database connection setup
├── middleware/      # Custom middleware
├── models/         # Database models
├── routes/         # API routes
└── utils/          # Utility functions
```

## API Endpoints

### Health Check
- `GET /health` - Check API health status

### User Routes
- `POST /users/register` - Register a new user
- `POST /users/login` - User login
- `GET /users/profile` - Get user profile (Protected)

### Blog Routes
- `GET /blogs` - Get all blog posts
- `POST /blogs` - Create a new blog post (Protected)
- `GET /blogs/:id` - Get a specific blog post
- `PUT /blogs/:id` - Update a blog post (Protected)
- `DELETE /blogs/:id` - Delete a blog post (Protected)

## Security

The application implements several security measures:
- JWT authentication
- Request validation
- Helmet security headers
- Error handling middleware
- Input sanitization

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## Error Handling

The API uses a centralized error handling mechanism through the `errorHandler` middleware, providing consistent error responses across the application.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
