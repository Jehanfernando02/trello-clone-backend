const User = require('../models/User');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'name email');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};