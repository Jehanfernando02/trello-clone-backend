const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');
const auth = require('../middleware/auth');

router.post('/', auth, listController.createList);
router.put('/:listId', auth, listController.updateListPosition);

module.exports = router;