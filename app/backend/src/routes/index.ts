import { Router } from 'express';
import teamsRoutes from './teams.routes';
import loginRoutes from './login.routes';
import matchesRoutes from './matches.routes';
import leaderboardRoutes from './leaderboard.routes';

const router = Router();

router.use('/teams', teamsRoutes);

router.use('/login', loginRoutes);

router.use('/matches', matchesRoutes);

router.use('/leaderboard', leaderboardRoutes);

export default router;
