const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');

router.post('/', auth, taskController.createTask);
router.put('/:taskId', auth, taskController.updateTask);
router.get('/board/:boardId', auth, taskController.getTasksByBoard);

module.exports = router;