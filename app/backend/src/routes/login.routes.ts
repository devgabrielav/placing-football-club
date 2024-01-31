import { Router } from 'express';
import loginControllers from '../controllers/login.controllers';
import loginMiddlewares from '../middlewares/loginMiddlewares';
import tokenMiddlewares from '../middlewares/tokenMiddlewares';

const router = Router();

router.post(
  '/',
  loginMiddlewares.emailAndPasswordRequired,
  loginMiddlewares.emailMustBeValidEmail,
  loginMiddlewares.passwordMinLength,
  loginControllers.login,
);

router.get('/role', tokenMiddlewares.authMiddleware, loginControllers.role);

export default router;
