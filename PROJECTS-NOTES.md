# ........................ MERN STACK APPROACH.................................

i want to build a rest api and consume it in next js's a registration and login system. The endpoints should be login, register, sendOTP, verifyOtp and finally resetPassword. 

1. **Backend (REST API):**
   - Use Node.js and Express.js to build the REST API.
   - Create a User model with fields like `email`, `password`, `otp`, `otpExpire`.
   - Implement `register` endpoint: validate input, check if user already exists, hash password, save user to database.
   - Implement `login` endpoint: validate input, check if user exists and password matches, generate a JWT token and send it as response.
   - Implement `sendOTP` endpoint: generate an OTP, set `otp` and `otpExpire` fields for the user, send OTP via email (use a service like Nodemailer).
   - Implement `verifyOtp` endpoint: validate input, check if OTP matches and is not expired, if valid, reset `otp` and `otpExpire` fields.
   - Implement `resetPassword` endpoint: validate input, hash new password, update user's password in the database.

2. **Frontend (Next.js):**
   - Create pages for Registration, Login, OTP Verification, and Password Reset.
   - Use `fetch` or `axios` to make HTTP requests to the backend.
   - Implement form handling and validation on each page.
   - Store JWT token in the browser's local storage and use it to make authenticated requests.


A well-organized folder structure is crucial for maintaining a clean and easily navigable codebase. Here's a suggestion for a scalable and maintainable project structure for your Next.js and Express.js application:

```
/my-app
├── /backend
│   ├── /node_modules
│   ├── /src
│   │   ├── /controllers
│   │   ├── /models
│   │   ├── /routes
│   │   ├── /utils
│   │   └── server.js
│   ├── package.json
│   └── package-lock.json
├── /frontend
│   ├── /node_modules
│   ├── /public
│   ├── /src
│   │   ├── /components
│   │   ├── /pages
│   │   ├── /styles
│   │   └── /utils
│   ├── package.json
│   ├── package-lock.json
│   └── next.config.js
└── README.md
```

**Backend:**

- `controllers`: This directory will contain all the controller functions that handle requests and responses.
- `models`: This directory will contain all the Mongoose models for your application.
- `routes`: This directory will contain all the route definitions for your Express application.
- `utils`: This directory will contain utility functions and middleware.

**Frontend:**

- `components`: This directory will contain all the reusable React components.
- `pages`: This directory will contain all the page components. Next.js uses the file system based routing, so each file in this directory will become a route automatically.
- `styles`: This directory will contain all the CSS or SCSS styles for your components.
- `utils`: This directory will contain utility functions such as API helpers.

Remember, this is just a suggestion and might not fit every project's needs. It's always a good idea to adapt the structure as the project grows based on the team's preferences and the project's requirements.



**Step 1: Initialize the backend project**

Create a new directory for your project, navigate into it, and initialize a new Node.js project:

```bash
mkdir my-app && cd my-app
mkdir backend && cd backend
npm init -y
```

**Step 2: Install necessary packages**

We'll need `express` for creating the server, `mongoose` for interacting with MongoDB, `bcryptjs` for hashing passwords, `jsonwebtoken` for creating JWT tokens, and `nodemailer` for sending emails:

```bash
npm install express mongoose bcryptjs jsonwebtoken nodemailer
```

**Step 3: Set up the Express server**

Create a new `server.js` file in the `src` directory and set up a basic Express server:

```javascript
const express = require('express');

const app = express();

app.use(express.json());

app.listen(5000, () => console.log('Server is running on port 5000'));
```

**Step 4: Connect to MongoDB**

You can use `mongoose` to connect to MongoDB. Make sure to replace `<your-mongodb-uri>` with your actual MongoDB URI:

```javascript
const mongoose = require('mongoose');

mongoose.connect('<your-mongodb-uri>', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));
```

**Step 5: Create the User model**

Create a new `User.js` file in the `models` directory:

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: { type: String },
  otpExpire: { type: Date },
});

module.exports = mongoose.model('User', userSchema);
```

**Step 6: Implement the `register` endpoint**

Create a new `auth.js` file in the `routes` directory:

```javascript
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  // Validate input...

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });

  await user.save();

  res.status(201).json({ message: 'User registered successfully' });
});

module.exports = router;
```

And import it in your `server.js`:

```javascript
const authRoutes = require('./routes/auth');

app.use('/api/auth', authRoutes);
```

This is the basic setup for the backend. You can follow similar steps to implement the `login`, `sendOTP`, `verifyOtp`, and `resetPassword` endpoints. 


# ........................NEXT JS APPROACH.................................

Sure, let's start with setting up the backend (API routes) using Next.js and TypeScript.

**Step 1: Initialize the Next.js project with TypeScript**

Create a new directory for your project, navigate into it, and initialize a new Next.js project with TypeScript:

```bash
pnpx create-next-app@latest --typescript
```

**Step 2: Install necessary packages**

We'll need `bcryptjs` for hashing passwords, `jsonwebtoken` for creating JWT tokens, `nodemailer` for sending emails, and `mongodb` or `mongoose` for interacting with MongoDB:

```bash
pnpm install bcryptjs jsonwebtoken nodemailer mongodb
```

**Step 3: Create the database connection utility**

Create a new `connectToDatabase.ts` file in the `lib` directory:

```typescript
import { MongoClient } from 'mongodb';

let uri = "<your-mongodb-uri>"; // replace with your MongoDB connection string
let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  cachedClient = client;
  return cachedClient;
}

export default connectToDatabase;
```

**Step 4: Implement the `register` endpoint**

Create a new `register.ts` file in the `pages/api/auth` directory:

```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import connectToDatabase from '../../../lib/connectToDatabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Validate input...

    const client = await connectToDatabase();
    const db = client.db(); // your database name

    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection('users').insertOne({ email, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully' });
  } else {
    res.status(400).json({ message: 'Only POST requests are allowed' });
  }
};
```

This is the basic setup for the backend using Next.js API routes. You can follow similar steps to implement the `login`, `sendOTP`, `verifyOtp`, and `resetPassword` endpoints. 

Once the backend is ready, you can start working on the frontend pages using Next.js. Would you like to proceed with the frontend now?