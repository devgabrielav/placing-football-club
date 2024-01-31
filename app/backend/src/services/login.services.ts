import * as bcrypt from 'bcryptjs';
import { Login } from '../types/Login';
import UserModel from '../database/models/users.model';
import { ServiceResponse } from '../types/ServiceResponse';
import jwtUtil from '../utils/jwtUtil';

type RoleType = { role: string };

const postLogin = async (login: Login): Promise<ServiceResponse<string>> => {
  const user = await UserModel.findOne({ where: { email: login.email } });

  if (!user) return { status: 'unauthorized', data: { message: 'Invalid email or password' } };

  const checkPassword = await bcrypt.compare(login.password, user.dataValues.password);

  if (!checkPassword) {
    return { status: 'unauthorized', data: { message: 'Invalid email or password' } };
  }

  const { id, email } = user.dataValues;

  const token = jwtUtil.loginSign({ id, email });

  return { status: 'successful', data: { token } };
};

const tokenIsValid = async (id: number): Promise<ServiceResponse<RoleType>> => {
  const findUser = await UserModel.findOne({ where: { id } });

  if (!findUser) {
    return { status: 'unauthorized', data: { message: 'Token must be a valid token' } };
  }

  return { status: 'successful', data: { role: findUser.dataValues.role } };
};

export default {
  postLogin,
  tokenIsValid,
};
