import { RequestHandler } from 'express';

const hasRequiredKeys: RequestHandler = (req, res, next) => {
  const { homeTeamGoals, awayTeamGoals } = req.body;

  if (!homeTeamGoals || !awayTeamGoals) {
    return res.status(400).json({ message: 'homeTeamGoals and awayTeamGoals, are required!' });
  }

  next();
};

/* const hasAllKeys: RequestHandler = (req, res, next) => {
  const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;

  if (!homeTeamId || !awayTeamId || !homeTeamGoals || !awayTeamGoals) {
    return res.status(400).json({ message: 'Missing required fields!' });
  }

  next();
};
 */
export default {
  hasRequiredKeys,
};
