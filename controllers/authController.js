const User = require('../models/User');
const admin = require('../config/firebase');

exports.login = async (req, res) => {
  const { idToken } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name } = decodedToken;

    let user = await User.findOne({ firebaseId: uid });
    if (!user) {
      user = await User.create({ firebaseId: uid, email, name });
    }

    res.json({ user });
  } catch (error) {
    res.status(400).json({ message: 'Login failed', error });
  }
};