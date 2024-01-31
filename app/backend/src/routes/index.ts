import { Router } from 'express';
import teamsRoutes from './teams.routes';
import loginRoutes from './login.routes';
import matchesRoutes from './matches.routes';

const router = Router();

router.use('/teams', teamsRoutes);

router.use('/login', loginRoutes);

router.use('/matches', matchesRoutes);

export default router;
