const { client } = require('../db/index');

const ServiceResponse = require('../entities/ServiceResponse');

const dishesService = {
  count: async () => {
    let serviceResponseCount = new ServiceResponse();
    try {
      const { rows } = await client.query('SELECT count(id) FROM platillo');
      serviceResponseCount.setSucessResponse('Counted rows ', rows[0]);
    } catch (error) {
      serviceResponseCount.setErrorResponse(error.message, 500);
    } finally {
      return serviceResponseCount;
    }
  },

  list: async () => {
    let serviceResponseList = new ServiceResponse();
    try {
      const { rows } = await client.query('SELECT * FROM "platillo"');
      serviceResponseList.setSucessResponse('Platillos encontradas', rows);
      console.log(rows);
    } catch (error) {
      serviceResponseList.setErrorResponse(error.message, 500);
    } finally {
      return serviceResponseList;
    }
  },

  create: async (name, description, image, price, idcategory) => {
    let serviceResponseCreate = new ServiceResponse();
    try {
      const { rows } = await client.query(
        'INSERT INTO platillo (nombre,descripcion,imagen,precio,id_categoria) values ($1,$2,$3,$4,$5) RETURNING *',
        [name, description, image, price, idcategory]
      );
      serviceResponseCreate.setSucessResponse('Platillo creado exitosamente', rows[0]);
    } catch (error) {
      serviceResponseCreate.setErrorResponse(error.message, 500);
    } finally {
      return serviceResponseCreate;
    }
  },

  edit: async (name, description, image, precio, id_categoria, id) => {
    let ServiceResponseEdit = new ServiceResponse();
    try {
      const { rows } = await client.query(
        'UPDATE platillo SET nombre=$1, descripcion=$2, imagen=$3, precio=$4, id_categoria=$5 WHERE id =$6',
        [name, description, image, precio, id_categoria, id]
      );
      ServiceResponseEdit.setSucessResponse('Categoría editada con éxito', true);
    } catch (error) {
      ServiceResponseEdit.setErrorResponse(error.message, 500);
    } finally {
      return ServiceResponseEdit;
    }
  },

  delete: async (id) => {
    let ServiceResponseDelete = new ServiceResponse();
    try {
      const { rows } = await client.query('DELETE FROM "platillo" WHERE id=$1 RETURNING *', [
        id,
      ]);
      ServiceResponseDelete.setSucessResponse('Categoría eliminada con éxito', true);
    } catch (error) {
      ServiceResponseDelete.setErrorResponse(error.message, 500);
    } finally {
      return ServiceResponseDelete;
    }
  },

  listPorCantidad: async (num) => {
    let ServiceResponseGetName = new ServiceResponse();
    try {
      const { rows } = await client.query(
        'SELECT * FROM "platillo"  FETCH FIRST $1 ROWS ONLY',
        [num]
      );
      ServiceResponseGetName.setSucessResponse('Categoría' + num + 'encontrada', rows);
    } catch (error) {
      ServiceResponseGetName.setErrorResponse(error.message, 500);
    } finally {
      return ServiceResponseGetName;
    }
  },

  listarporNombre: async (name) => {
    let ServiceResponseSelect = new ServiceResponse();
    try {
      const { rows } = await client.query('SELECT * FROM platillo WHERE "name"=$1', [name]);
      ServiceResponseSelect.setSucessResponse('Platillos encontrados', rows);
      console.log(ServiceResponseSelect);
    } catch (error) {
      ServiceResponseSelect.setErrorResponse(error.message, 500);
    } finally {
      return ServiceResponseSelect;
    }
  },
};

module.exports = dishesService;
