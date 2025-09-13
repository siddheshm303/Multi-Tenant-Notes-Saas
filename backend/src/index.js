const express = require('express');
const connectDB = require('./config/db');

connectDB();

const app = express();
app.use(express.json());

// Routes
app.use('/auth', require('./routes/auth.routes'));
app.use('/notes', require('./routes/notes.routes'));

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
