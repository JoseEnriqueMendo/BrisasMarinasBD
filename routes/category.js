const router = require('express').Router();
const pool = require('../db');
const categoryController = require('../controllers/category');

router.get('/all', async (req, res) => {
  const responseShowData = await categoryController.list();
  res.send(responseShowData);
});

router.get('/count', async (req, res) => {
  const responseCount = await categoryController.count();
  res.send(responseCount);
});

router.post('/create', async (req, res) => {
  const { name, description, url } = req.body;
  const responseCreate = await categoryController.create(name, description, url);
  res.send(responseCreate);
});

router.put('/edit', async (req, res) => {
  const { name, description, url, id } = req.body;
  const responseEdit = await categoryController.edit(name, description, url, id);
  res.send(responseEdit);
});

router.delete('/delete', async (req, res) => {
  const { id } = req.body;
  const responseDelete = await categoryController.delete(id);
  res.send(responseDelete);
});

router.get('/getID/:name', async (req, res) => {
  const { name } = req.params;
  const response = await categoryController.showName(name);
  res.send(response);
});

router.get('/getname/:id', async (req, res) => {
  const { id } = req.params;
  const response = await categoryController.getName(id);
  res.send(response);
});

router.get('/listPorCantidad/:num', async (req, res) => {
  const { num } = req.params;
  const response = await categoryController.listPorCantidad(num);
  res.send(response);
});

module.exports = router;
