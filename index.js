const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes/index');
const dotenv = require('dotenv');
const { client } = require('./db/index');

dotenv.config();

//middleware
app.use(express.json()); //req.body
app.use(cors());

//ROUTES//
app.use('/', routes);
app.get('/message', async (req, res) => {
  try {
    const queryResult = await client.query('SELECT $1::text as mensaje', [
      'Hola, Haciendo Conexcion con la base de datos',
    ]);
    const mensaje = queryResult.rows[0].mensaje;
    res.status(200).send(mensaje);
  } catch (error) {
    res.status(500).send('ERROR AL CONECTAR A LA BD');
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
