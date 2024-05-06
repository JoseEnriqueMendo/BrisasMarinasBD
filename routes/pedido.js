const router = require('express').Router();
const pedidoController = require('../controllers/pedido');

router.post('/create', async (req, res) => {
  const { cantidad, subtotal, id_platillo, id_factura } = req.body;
  const responseCreate = await pedidoController.create(
    cantidad,
    subtotal,
    id_platillo,
    id_factura
  );
  res.send(responseCreate);
});

router.get('/selectPedidoPorUsuario', async (req, res) => {
  const { id } = req.body;
  const responseSelect = await pedidoController.listPorUsuario(id);
  res.send(responseSelect);
});

module.exports = router;
