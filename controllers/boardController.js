const Board = require('../models/Board');

exports.createBoard = async (req, res) => {
  const { title } = req.body;
  try {
    const board = await Board.create({ title, owner: req.user.id });
    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getBoards = async (req, res) => {
  try {
    const boards = await Board.find({ $or: [{ owner: req.user.id }, { members: req.user.id }] });
    res.json(boards);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};