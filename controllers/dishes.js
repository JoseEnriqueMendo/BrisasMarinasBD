const ServiceResponse = require('../entities/ServiceResponse');
const dishesService = require('../services/dishes');
const categoryService = require('../services/category');

const e = require('express');
const { response } = require('express');

const dishesController = {
  count: async () => {
    const response = await dishesService.count();

    if (response.data.count === '0') {
      response.setSucessResponse('No hay categorías en la base de datos', false);
      return response;
    }

    response.setSucessResponse('Categoría(s) encontradas', response.data.count);
    return response;
  },

  list: async () => {
    const responseData = await dishesService.list();
    if (!responseData.data) {
      responseData.setErrorResponse('No hay registros de platos', 400);
      return responseData;
    }

    return responseData;
  },

  create: async (name, description, image, price, idcategory) => {
    const responseCreate = await dishesService.create(
      name,
      description,
      image,
      price,
      idcategory
    );

    return responseCreate;
  },

  edit: async (name, description, image, price, idcategory, id) => {
    const responseEdit = await dishesService.edit(
      name,
      description,
      image,
      price,
      idcategory,
      id
    );

    return responseEdit;
  },

  delete: async (id) => {
    const responseDelete = await dishesService.delete(id);
    return responseDelete;
  },

  listPorCantidad: async (num) => {
    const nameResponse = await dishesService.listPorCantidad(num);
    return nameResponse;
  },

  //Corregir
  selectDishes: async (nombre) => {
    const idResponse = await categoryService.obtenerIdPorNombre(nombre);

    if (!idResponse.data) {
      idResponse.setErrorResponse('id no encontrada', 500);
      return idResponse;
    }

    const SelectResponse = await dishesService.listarporNombre(idResponse.data.id);
    return SelectResponse;
  },
};

module.exports = dishesController;
