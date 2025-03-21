require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database.js');
const admin = require('firebase-admin');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

connectDB();

const verifyToken = async (req, res, next) => {
  const idToken = req.headers.authorization?.split('Bearer ')[1];
  if (!idToken) {
    console.log('No token provided in request:', req.method, req.url);
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    console.log('Token verified for user:', decodedToken.uid);
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    res.status(401).json({ error: 'Invalid token', details: error.message });
  }
};

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/boards', verifyToken, require('./routes/boardRoutes'));
app.use('/api/lists', verifyToken, require('./routes/listRoutes'));
app.use('/api/tasks', verifyToken, require('./routes/taskRoutes'));

// Test route
app.get('/api/test', (req, res) => res.json({ message: 'Backend is alive' }));

app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));