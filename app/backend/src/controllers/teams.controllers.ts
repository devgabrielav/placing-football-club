import { Request, Response } from 'express';
import teamsServices from '../services/teams.services';
import httpMapStatus from '../utils/httpMapStatus';

async function getAll(_req: Request, res: Response) {
  const { status, data } = await teamsServices.getAllTeams();

  const code = httpMapStatus(status);

  res.status(code).json(data);
}

async function getById(req: Request, res: Response) {
  const { id } = req.params;
  const { status, data } = await teamsServices.getTeamById(Number(id));

  const code = httpMapStatus(status);

  res.status(code).json(data);
}

export default {
  getAll,
  getById,
};
