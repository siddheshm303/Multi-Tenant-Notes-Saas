const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');


connectDB();

const app = express();


//Allowed origins (local + Vercel frontend)
const allowedOrigins = [
  'http://localhost:3000', // for local frontend dev
  'https://multi-tenant-notes-saas-frontend.vercel.app' // deployed frontend
];

//Configure CORS
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.options("*", cors());

app.use(express.json());

// Routes
app.use('/auth', require('./routes/auth.routes'));
app.use('/notes', require('./routes/notes.routes'));
app.use('/tenants', require('./routes/tenant.routes'));

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
