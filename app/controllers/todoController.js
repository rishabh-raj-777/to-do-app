const Todo = require('../models/Todo');

exports.getAllTodos = async (req, res) => {
  const todos = await Todo.find().sort({ _id: -1 });
  res.render('index', { todos });
};

exports.createTodo = async (req, res) => {
  const { task } = req.body;
  await Todo.create({ task });
  res.redirect('/');
};

exports.toggleComplete = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.completed = !todo.completed;
  await todo.save();
  res.redirect('/');
};

exports.deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.redirect('/');
};
