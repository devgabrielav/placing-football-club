import TeamModel from '../database/models/teams.model';
import MatchModel, { MatchSequelizeModel } from '../database/models/matches.model';
import { ServiceResponse } from '../types/ServiceResponse';
import filterMatch from '../utils/filterMatches';
import { MatchGoals } from '../types/Match';

const getAllMatches = async (query?: string): Promise<ServiceResponse<MatchSequelizeModel[]>> => {
  const matches = await MatchModel.findAll({
    include: [
      {
        model: TeamModel,
        as: 'homeTeam',
        attributes: ['teamName'],
      },
      {
        model: TeamModel,
        as: 'awayTeam',
        attributes: ['teamName'],
      },
    ],
  });

  if (query) return { status: 'successful', data: filterMatch(query, matches) };

  return { status: 'successful', data: matches };
};

const updateMatchInProgress = async (id: number): Promise<ServiceResponse<{ message: string }>> => {
  const findMatch = await MatchModel.findOne({ where: { id } });

  if (!findMatch) {
    return { status: 'notFound', data: { message: 'There is no match with such id!' } };
  }

  MatchModel.update({ inProgress: false }, { where: { id } });

  return { status: 'successful', data: { message: 'Finished' } };
};

const updateGoalsMatch = async (
  id: number,
  goals: MatchGoals,
): Promise<ServiceResponse<{ message: string }>> => {
  const findMatch = await MatchModel.findOne({ where: { id } });

  if (!findMatch) {
    return { status: 'notFound', data: { message: 'There is no match with such id!' } };
  }

  await MatchModel.update(
    { homeTeamGoals: goals.homeTeamGoals, awayTeamGoals: goals.awayTeamGoals },
    { where: { id } },
  );

  return { status: 'successful', data: { message: 'Goals updated!' } };
};

export default {
  getAllMatches,
  updateMatchInProgress,
  updateGoalsMatch,
};
