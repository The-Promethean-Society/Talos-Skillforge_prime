
require('dotenv').config();
const express = require('express');
const cors = require('cors');
// NextAuth will be integrated here in a future step.

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(cors({
  origin: process.env.NEXTAUTH_URL, // Allow requests from our Next.js app
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// A simple health check endpoint
app.get('/', (req, res) => {
  res.send('Authentication Service is running.');
});

// We will add the NextAuth.js handler here later.

app.listen(port, () => {
  console.log(`Authentication Service listening on port ${port}`);
});
