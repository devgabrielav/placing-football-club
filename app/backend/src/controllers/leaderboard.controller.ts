import { Request, Response } from 'express';
import leaderboardServices from '../services/leaderboard.services';
import httpMapStatus from '../utils/httpMapStatus';

async function getHomeTeamsPerfomances(_req: Request, res: Response) {
  const { status, data } = await leaderboardServices.getTeamsPerformance();
  const code = httpMapStatus(status);

  res.status(code).json(data);
}

export default {
  getHomeTeamsPerfomances,
};
