import { Request, Response } from 'express';
import leaderboardServices from '../services/leaderboard.services';
import httpMapStatus from '../utils/httpMapStatus';

async function getHomeTeamsPerfomances(_req: Request, res: Response) {
  const { status, data } = await leaderboardServices.getTeamsPerformance('home');
  const code = httpMapStatus(status);

  res.status(code).json(data);
}

async function getAwayTeamsPerfomances(_req: Request, res: Response) {
  const { status, data } = await leaderboardServices.getTeamsPerformance('away');
  const code = httpMapStatus(status);

  res.status(code).json(data);
}

async function getGeneralTeamsPerfomances(_req: Request, res: Response) {
  const { status, data } = await leaderboardServices.getAllTeamsPerfomance('home', 'away');
  const code = httpMapStatus(status);

  res.status(code).json(data);
}

export default {
  getHomeTeamsPerfomances,
  getAwayTeamsPerfomances,
  getGeneralTeamsPerfomances,
};
