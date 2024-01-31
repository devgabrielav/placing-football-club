import { Request, Response } from 'express';
import loginServices from '../services/login.services';
import httpMapStatus from '../utils/httpMapStatus';
import jwtUtil from '../utils/jwtUtil';

async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const { status, data } = await loginServices.postLogin({ email, password });

  const code = httpMapStatus(status);

  res.status(code).json(data);
}

async function role(req: Request, res: Response) {
  const { authorization } = req.headers;
  const checkToken = jwtUtil.loginVerify(authorization as string);

  const { status, data } = await loginServices.tokenIsValid(checkToken.id);

  const code = httpMapStatus(status);

  res.status(code).json(data);
}

export default {
  login,
  role,
};
