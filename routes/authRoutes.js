const express = require('express');
const router = express.Router();
const admin = require('firebase-admin'); // Import firebase-admin here

router.post('/login', async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) {
    console.log('No idToken provided in login request');
    return res.status(400).json({ error: 'ID token is required' });
  }
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const user = {
      uid: decodedToken.uid,
      name: decodedToken.name || 'User',
      email: decodedToken.email,
    };
    console.log('Auth success for user:', user.uid);
    res.json({ user });
  } catch (error) {
    console.error('Auth error in login route:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;