const List = require('../models/List');

exports.createList = async (req, res) => {
  const { title, boardId } = req.body;
  try {
    const list = await List.create({ title, board: boardId });
    res.status(201).json(list);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.updateListPosition = async (req, res) => {
  const { listId } = req.params;
  const { position } = req.body;
  try {
    const list = await List.findByIdAndUpdate(listId, { position }, { new: true });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};