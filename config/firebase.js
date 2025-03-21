const admin = require("firebase-admin");

// Check if Firebase app is already initialized
if (!admin.apps.length) {
  admin.initializeApp();
} else {
  admin.app(); // Use the existing app
}

module.exports = admin;
