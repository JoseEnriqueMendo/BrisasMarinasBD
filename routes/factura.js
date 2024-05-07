const router = require('express').Router();
const facturaController = require('../controllers/factura');

router.post('/create', async (req, res) => {
  const { total, fecha, id_usuario } = req.body;
  const responseCreate = await facturaController.create(total, fecha, id_usuario);
  res.send(responseCreate);
});

module.exports = router;
