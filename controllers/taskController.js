const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  const { title, boardId, listId } = req.body;
  try {
    const task = await Task.create({ title, board: boardId, list: listId, assignees: [req.user.id] });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { status, listId, position, assignees } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { status, list: listId, position, assignees },
      { new: true }
    );
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getTasksByBoard = async (req, res) => {
  const { boardId } = req.params;
  try {
    const tasks = await Task.find({ board: boardId }).populate('assignees', 'name email');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};