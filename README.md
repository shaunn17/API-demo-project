Express + GraphQL API Server

This is a sample Node.js server using Express and GraphQL, exposing both REST and GraphQL APIs to work with mock data for users, posts, and comments. It's great for understanding how to build hybrid API services.

🚀 Features

✅ REST API endpoints to fetch users, posts, and comments

✅ GraphQL API with nested data queries

✅ In-memory mock data (no database)

✅ CORS and JSON support

✅ GraphiQL IDE for easy GraphQL testing

📁 Project Structure
.
├── server.js          # Main server file
├── package.json       # Project dependencies
└── README.md          # Documentation

📦 Setup Instructions
✅ Prerequisites

Node.js (v14 or later)

npm

📥 Install Dependencies
npm install

▶️ Start the Server
node server.js


You’ll see:

Server is running on http://localhost:4000
GraphQL endpoint available at http://localhost:4000/graphql

🧠 Data Overview

This project uses hardcoded mock data:

👤 Users
[
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" }
]

📝 Posts

Each post includes userId, title, body, and createdAt.

💬 Comments

Each comment includes postId, author, and text.

🔗 REST API Endpoints
Get user by ID

GET /users/:id

Example:

curl http://localhost:4000/users/1

Get posts for a user

GET /users/:id/posts

Example:

curl http://localhost:4000/users/1/posts

Get comments for a post

GET /posts/:id/comments

Example:

curl http://localhost:4000/posts/101/comments

🧪 GraphQL API

Access GraphQL IDE at:
👉 http://localhost:4000/graphql

Example Queries
1. Get a user with their posts and comments
{
  user(id: 1) {
    id
    name
    email
    posts {
      id
      title
      createdAt
      comments {
        author
        text
      }
    }
  }
}

2. Get a post with its comments
{
  post(id: 101) {
    title
    body
    createdAt
    comments {
      author
      text
    }
  }
}

3. Get a single comment
{
  comment(id: 1001) {
    id
    postId
    author
    text
  }
}

🛠️ Built With

Node.js

Express.js

GraphQL

express-graphql

CORS

📌 Notes

Data is stored in-memory, no external DB.

Ideal for learning GraphQL, Express, and REST side-by-side.
