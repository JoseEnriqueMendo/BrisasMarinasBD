const userService = require('../services/user');
const { hashPassword } = require('../utils/encryption');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');

const userController = {
  count: async () => {
    const response = await userService.count();

    if (response.data.count === '0') {
      response.setSucessResponse('No hay usuarios en la base de datos', 0);
      return response;
    }
    return response;
  },

  list: async (filtro) => {
    const responseData = await userService.list(filtro);
    if (!responseData.data) {
      responseData.setErrorResponse('No hay registros de usuarios', 400);
      return responseData;
    }
    return responseData;
  },

  getUser: async (id) => {
    const idResponse = await userService.obtenerUsuarioPorId(id);
    if (!idResponse.data) {
      idResponse.setErrorResponse('ERROR', 401);
    }

    return idResponse;
  },

  register: async (name, lastname, gender, email, dni, phone, password, role) => {
    const response = await userService.obtenerUsuarioPorEmail(email);
    if (response.data) {
      response.setErrorResponse('Ya existe un usuario con este email', 400);
      return response;
    }
    const hashedPassword = await hashPassword(password);
    const role_num = role === 'ADM' ? 1 : 2;
    const resultRegister = await userService.registro(
      name,
      lastname,
      gender,
      email,
      dni,
      phone,
      hashedPassword,
      role_num
    );

    if (!resultRegister.data) {
      resultRegister.setErrorResponse('Error al registrar', 400);
      return resultRegister;
    }

    return resultRegister;
  },

  login: async (email, password, type) => {
    const responseExists = await userService.obtenerUsuarioPorEmail(email);
    if (!responseExists.data) {
      responseExists.setErrorResponse('El email seleccionado no es válido', 401);
      return responseExists;
    }

    const roleResponse = responseExists.data.id_profile;

    const role_num = responseExists.data.id_profile === 1 ? 'ADM' : 'CLI';

    if (role_num !== 'ADM' && type === 'ADM_FRONTEND') {
      roleResponse.setErrorResponse('No se tiene permisos para acceder a esta página', 401);
      return roleResponse;
    }

    const validPassword = await bcrypt.compare(password, responseExists.data.password);

    if (!validPassword) {
      responseExists.setErrorResponse('Contraseña no válida', 401);
      return responseExists;
    }

    const token = jwtGenerator(responseExists.data.id);

    responseExists.setSucessResponse('Se inició sesión exitosamente', {
      token: token,
    });

    return responseExists;
  },

  edit: async (name, lastname, email, dni, phone, id) => {
    const responseEdit = await userService.edit(name, lastname, email, dni, phone, id);

    return responseEdit;
  },

  delete: async (id) => {
    const responseDelete = await userService.delete(id);
    return responseDelete;
  },

  // Eliminar tal vez
  obtenerUsuario: async (email) => {
    const idResponse = await userService.obtenerUsuarioPorEmail(email);

    if (!idResponse.data) {
      idResponse.setErrorResponse('ERROR al obtener el usuario', 401);
    }
    return idResponse;
  },
};

module.exports = userController;
