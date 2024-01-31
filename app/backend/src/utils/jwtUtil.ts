import * as jwt from 'jsonwebtoken';
import { TokenPayload } from '../types/TokenPayload';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const loginSign = (payload: TokenPayload): string => {
  const token = jwt.sign(payload, secret);
  return token;
};

const loginVerify = (token: string): TokenPayload => {
  const tokenResult = token.split(' ')[1];
  const data = jwt.verify(tokenResult, secret) as TokenPayload;
  return data;
};

export default {
  loginSign,
  loginVerify,
};
