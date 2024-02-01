import TeamModel from '../database/models/teams.model';
import MatchModel, { MatchSequelizeModel } from '../database/models/matches.model';
import { ServiceResponse } from '../types/ServiceResponse';
import filterMatch from '../utils/filterMatches';
import { MatchGoals, NewMatch } from '../types/Match';

const getAllMatches = async (): Promise<ServiceResponse<MatchSequelizeModel[]>> => {
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

  return { status: 'successful', data: matches };
};

const filteredMatches = async (
  query: string,
): Promise<ServiceResponse<MatchSequelizeModel[]>> => {
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

  const data = filterMatch(query, matches);
  return { status: 'successful', data };
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

const addNewMatch = async (match: NewMatch): Promise<ServiceResponse<MatchSequelizeModel>> => {
  const homeTeam = await TeamModel.findOne({ where: { id: match.homeTeamId } });
  const awayTeam = await TeamModel.findOne({ where: { id: match.awayTeamId } });

  if (!homeTeam || !awayTeam) {
    return { status: 'notFound', data: { message: 'There is no team with such id!' } };
  }

  if (homeTeam.dataValues.teamName === awayTeam.dataValues.teamName) {
    return { status: 'unprocessable',
      data: { message: 'It is not possible to create a match with two equal teams' } };
  }

  const data = {
    ...match,
    inProgress: true,
  };

  const newMatch = await MatchModel.create(data);

  return { status: 'created', data: newMatch };
};

export default {
  getAllMatches,
  updateMatchInProgress,
  updateGoalsMatch,
  addNewMatch,
  filteredMatches,
};
