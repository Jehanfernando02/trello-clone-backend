const express = require('express');
const router = express.Router();
const Board = require('../models/Board');

// GET all boards for the authenticated user
router.get('/', async (req, res) => {
  try {
    const boards = await Board.find({ userId: req.user.uid });
    console.log('Fetched boards for user:', req.user.uid, boards);
    res.json(boards);
  } catch (error) {
    console.error('Error fetching boards:', error.message);
    res.status(500).json({ message: 'Server error fetching boards', error: error.message });
  }
});

// POST create a new board
router.post('/', async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  try {
    const board = new Board({
      title,
      userId: req.user.uid,
    });
    const savedBoard = await board.save();
    console.log('Created board:', savedBoard);
    res.status(201).json(savedBoard);
  } catch (error) {
    console.error('Error creating board:', error.message);
    res.status(500).json({ message: 'Server error creating board', error: error.message });
  }
});

module.exports = router;