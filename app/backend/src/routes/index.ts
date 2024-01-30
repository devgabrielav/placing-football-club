import { Router } from 'express';
import teamsRoutes from './teams.routes';

const router = Router();

router.use('/teams', teamsRoutes);

export default router;
