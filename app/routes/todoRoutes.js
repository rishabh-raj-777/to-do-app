const express = require('express');
const router = express.Router();
const {
  getAllTodos,
  createTodo,
  toggleComplete,
  deleteTodo
} = require('../controllers/todoController');

router.get('/', getAllTodos);
router.post('/add', createTodo);
router.post('/toggle/:id', toggleComplete);
router.post('/delete/:id', deleteTodo);

module.exports = router;
