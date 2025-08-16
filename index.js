const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
} = require('graphql');

const app = express();
app.use(cors());
app.use(express.json());

// Sample data
const users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" }
];

const posts = [
  { id: 101, userId: 1, title: "My First Post", body: "Hello, world!", createdAt: "2025-05-20T10:00:00Z" },
  { id: 102, userId: 1, title: "A Day in the Life", body: "Today I went to the park...", createdAt: "2025-05-20T10:00:00Z" },
  { id: 201, userId: 2, title: "Trip to the Zoo", body: "I saw a lion...", createdAt: "2025-05-20T10:00:00Z" },
  { id: 202, userId: 2, title: "Cooking 101", body: "Today I baked cookies...", createdAt: "2025-05-20T10:00:00Z" }
];

const comments = [
  { id: 1001, postId: 101, author: "Bob", text: "Great first post!" },
  { id: 1002, postId: 101, author: "Carol", text: "Welcome to blogging!" },
  { id: 1003, postId: 102, author: "Dave", text: "Nice day-in-the-life post!" },
  { id: 2001, postId: 202, author: "Alice", text: "Yum!" },
  { id: 2002, postId: 202, author: "Carol", text: "Can I have a cookie?" }
];

// ------------------
// REST endpoints
// ------------------

// Get user by ID
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Get posts for a user
app.get('/users/:id/posts', (req, res) => {
  const userId = parseInt(req.params.id);
  const userPosts = posts.filter(p => p.userId === userId);
  res.json(userPosts);
});

// Get comments for a post
app.get('/posts/:id/comments', (req, res) => {
  const postId = parseInt(req.params.id);
  const postComments = comments.filter(c => c.postId === postId);
  res.json(postComments);
});

// ------------------
// GraphQL schema
// ------------------

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: {
    id: { type: GraphQLInt },
    postId: { type: GraphQLInt },
    author: { type: GraphQLString },
    text: { type: GraphQLString }
  }
});

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: { type: GraphQLInt },
    userId: { type: GraphQLInt },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    createdAt: { type: GraphQLString },    // ← new field
    comments: {
      type: new GraphQLList(CommentType),
      resolve: (post) => comments.filter(c => c.postId === post.id)
    }
  }
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    posts: {
      type: new GraphQLList(PostType),
      resolve: (user) => posts.filter(p => p.userId === user.id)
    }
  }
});

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLInt } },
      resolve: (parent, args) => users.find(u => u.id === args.id)
    },
    post: {
      type: PostType,
      args: { id: { type: GraphQLInt } },
      resolve: (parent, args) => posts.find(p => p.id === args.id)
    },
    comment: {
      type: CommentType,
      args: { id: { type: GraphQLInt } },
      resolve: (parent, args) => comments.find(c => c.id === args.id)
    }
  }
});

const schema = new GraphQLSchema({
  query: RootQueryType
});

// GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`GraphQL endpoint available at http://localhost:${PORT}/graphql`);
});
