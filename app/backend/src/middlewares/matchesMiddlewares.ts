import { RequestHandler } from 'express';

const hasRequiredKeys: RequestHandler = (req, res, next) => {
  const { homeTeamGoals, awayTeamGoals } = req.body;

  if (!homeTeamGoals || !awayTeamGoals) {
    return res.status(400).json({ message: 'homeTeamGoals and awayTeamGoals, are required!' });
  }

  next();
};

export default {
  hasRequiredKeys,
};
