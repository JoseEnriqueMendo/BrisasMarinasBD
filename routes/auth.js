const router = require('express').Router();
const userController = require('../controllers/user');
const authorize = require('../middleware/User/authorize');
const validInfo = require('../middleware/User/validInfo');

router.get('/count', async (req, res) => {
  const responseCount = await userController.count();
  res.send(responseCount);
});

router.get('/all', async (req, res) => {
  const { num } = req.query;
  const filtro = num === undefined ? -1 : parseInt(num);
  const responseShowData = await userController.list(filtro);
  res.send(responseShowData);
});

router.get('/verify', authorize, (req, res) => {
  res.json(true);
});

router.get('/getUser', authorize, async (req, res) => {
  const response = await userController.getUser(req.user);
  res.send(response);
});

router.post('/register', async (req, res) => {
  const { name, lastname, gender, email, dni, phone, password, role } = req.body;

  const registerResponse = await userController.register(
    name,
    lastname,
    gender,
    email,
    dni,
    phone,
    password,
    role
  );

  res.send(registerResponse);
});

router.post('/login', async (req, res) => {
  const { email, password, type } = req.body;
  const loginResponse = await userController.login(email, password, type);
  res.send(loginResponse);
});

router.delete('/delete', async (req, res) => {
  const { id } = req.body;
  const responseDelete = await userController.delete(id);
  res.send(responseDelete);
});

router.put('/edit', async (req, res) => {
  const { name, lastname, email, dni, phone, id } = req.body;
  const responseEdit = await userController.edit(name, lastname, email, dni, phone, id);
  res.send(responseEdit);
});

// Eliminar
router.get('/getUserbyEmail/:email', async (req, res) => {
  const { email } = req.params;
  const response = await userController.obtenerUsuario(email);
  res.send(response);
});

module.exports = router;
