import { Request, Response } from 'express';
import matchesServices from '../services/matches.services';
import httpMapStatus from '../utils/httpMapStatus';

async function getAll(req: Request, res: Response) {
  const { inProgress } = req.query;

  const { status, data } = await matchesServices.getAllMatches(inProgress as string | undefined);
  const code = httpMapStatus(status);

  res.status(code).json(data);
}

async function updateMatchProgress(req: Request, res: Response) {
  const { id } = req.params;

  const { status, data } = await matchesServices.updateMatchInProgress(Number(id));
  const code = httpMapStatus(status);

  res.status(code).json(data);
}

async function updateMatchGoals(req: Request, res: Response) {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;

  const { status, data } = await matchesServices
    .updateGoalsMatch(Number(id), { homeTeamGoals, awayTeamGoals });
  const code = httpMapStatus(status);

  res.status(code).json(data);
}

export default {
  getAll,
  updateMatchProgress,
  updateMatchGoals,
};
