const ServiceResponse = require('../entities/ServiceResponse');
const userService = require('../services/user');

const { hashPassword } = require('../utils/encryption');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');

const e = require('express');
const { response } = require('express');

const userController = {
  count: async () => {
    const response = await userService.count();

    if (response.data.count === '0') {
      response.setSucessResponse('No hay usuarios en la base de datos', false);
      return response;
    }

    response.setSucessResponse('Usuario(s) encontrados', response.data.count);
    return response;
  },

  list: async () => {
    const responseData = await userService.list();
    if (!responseData.data) {
      responseData.setErrorResponse('No hay registros de usuarios', 400);
      return responseData;
    }

    return responseData;
  },

  register: async (name, lastname, gender, email, dni, phone, password, role) => {
    const response = await userService.obtenerUsuario(email);

    //Comprobar si el email es valido

    if (response.data) {
      response.setErrorResponse('Ya existe un usuario con este email', 400);
      return response;
    }
    //Encriptar contraseña

    const hashedPassword = await hashPassword(password);
    //INSERT user into the database

    if (role === 'ADM') {
      console.log('ADMIN');
      const AdminResult = await userService.registro(
        name,
        lastname,
        gender,
        email,
        dni,
        phone,
        hashedPassword,
        1
      );
      return AdminResult;
    } else {
      console.log('CLIENT');
      const ClientResult = await userService.registro(
        name,
        lastname,
        gender,
        email,
        dni,
        phone,
        hashedPassword,
        2
      );
      return ClientResult;
    }
  },

  login: async (email, password) => {
    //Verificar que el usuario exista
    const responseExists = await userService.obtenerUsuario(email);

    if (!responseExists.data) {
      responseExists.setErrorResponse('El email seleccionado no es válido', 401);
      return responseExists;
    }

    //Verificar que el rol coincida con el administrador

    const roleResponse = await userService.obtenerRolPorEmail(email);

    if (roleResponse.data.code !== 'ADM') {
      roleResponse.setErrorResponse('No se tiene permisos para acceder a esta página', 401);
      return roleResponse;
    }

    //Verificar que la contraseña coincida

    const validPassword = await bcrypt.compare(password, responseExists.data.password);

    if (!validPassword) {
      responseExists.setErrorResponse('Contraseña no válida', 401);
      return responseExists;
    }

    //Crear Json web Token

    const token = jwtGenerator(responseExists.data.id);

    responseExists.setSucessResponse('Se inició sesión exitosamente', {
      token: token,
    });

    return responseExists;
  },

  loginCliente: async (email, password) => {
    //Verificar que el usuario exista
    const responseExists = await userService.obtenerUsuario(email);

    if (!responseExists.data) {
      responseExists.setErrorResponse('El email seleccionado no es válido', 401);
      return responseExists;
    }

    //Verificar que la contraseña coincida

    const validPassword = await bcrypt.compare(password, responseExists.data.password);

    if (!validPassword) {
      responseExists.setErrorResponse('Contraseña no válida', 401);
      return responseExists;
    }

    //Crear Json web Token

    const token = jwtGenerator(responseExists.data.id);

    responseExists.setSucessResponse('Se inició sesión exitosamente', {
      token: token,
    });

    return responseExists;
  },

  showName: async (id) => {
    const idResponse = await userService.obtenerUsuarioPorId(id);

    if (!idResponse.data.name) {
      idResponse.setErrorResponse('ERROR', 401);
    }

    return idResponse;
  },

  delete: async (id) => {
    const responseDelete = await userService.delete(id);
    return responseDelete;
  },

  obtenerUsuario: async (email) => {
    const idResponse = await userService.obtenerUsuarioPorEmail(email);

    if (!idResponse.data.name) {
      idResponse.setErrorResponse('ERROR', 401);
    }

    return idResponse;
  },

  edit: async (name, lastname, email, dni, phone, id) => {
    const responseEdit = await userService.edit(name, lastname, email, dni, phone, id);

    return responseEdit;
  },
};

module.exports = userController;
