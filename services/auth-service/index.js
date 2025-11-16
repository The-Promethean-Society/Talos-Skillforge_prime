
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const NextAuth = require('next-auth').default;
const GoogleProvider = require('next-auth/providers/google').default;

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
// The URL of our Next.js frontend, which will be making requests to this service.
app.use(cors({
  origin: process.env.NEXTAUTH_URL, 
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('Missing Google OAuth environment variables in the auth-service');
}

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
};


// Mounting NextAuth.js on all routes to /api/auth/*
// This single line creates all the necessary endpoints:
// /api/auth/signin, /api/auth/signout, /api/auth/session, /api/auth/callback/google, etc.
app.all('/api/auth/*', (req, res) => {
  req.query.nextauth = req.path.split('/').slice(3);
  return NextAuth(req, res, authOptions);
});


app.get('/', (req, res) => {
  res.send('Authentication Service is running.');
});


app.listen(port, () => {
  console.log(`Authentication Service listening on port ${port}`);
});
