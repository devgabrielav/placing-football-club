import { RequestHandler } from 'express';
import jwtUtil from '../utils/jwtUtil';
import UserModel from '../database/models/users.model';

const authMiddleware: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  try {
    const check = jwtUtil.loginVerify(authorization);
    const user = await UserModel.findOne({ where: { id: check.id } });
    if (!user) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    next();
  } catch (e) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default {
  authMiddleware,
};
