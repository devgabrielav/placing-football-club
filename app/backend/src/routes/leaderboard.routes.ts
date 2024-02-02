import { Router } from 'express';
import leaderboardController from '../controllers/leaderboard.controller';

const router = Router();

router.get('/home', leaderboardController.getHomeTeamsPerfomances);

router.get('/away', leaderboardController.getAwayTeamsPerfomances);

export default router;
