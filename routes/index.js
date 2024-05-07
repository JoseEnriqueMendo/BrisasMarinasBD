const router = require('express').Router();
const authRouter = require('./auth');
const categoryRouter = require('./category');
const dishesRouter = require('./dishes.js');
const facturaRouter = require('./factura.js');
const pedidoRouter = require('./pedido');

router.use('/auth', authRouter);
router.use('/category', categoryRouter);
router.use('/dishes', dishesRouter);
router.use('/factura', facturaRouter);
router.use('/pedido', pedidoRouter);
module.exports = router;
