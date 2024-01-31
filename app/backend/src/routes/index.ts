import { Router } from 'express';
import teamsRoutes from './teams.routes';
import loginRoutes from './login.routes';

const router = Router();

router.use('/teams', teamsRoutes);

router.use('/login', loginRoutes);

export default router;
