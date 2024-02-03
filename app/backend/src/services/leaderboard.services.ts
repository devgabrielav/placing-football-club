import TeamModel from '../database/models/teams.model';
import MatchModel from '../database/models/matches.model';
import { ServiceResponse } from '../types/ServiceResponse';
import { FromType, LeaderBoardType } from '../types/LeaderBoard';
import leaderboardUtils from '../utils/leaderboardUtils';
import leaderboardUtilsAll from '../utils/allTeamsLeaderboard.utils';

const getTeamsPerformance = async (from: FromType): Promise<ServiceResponse<LeaderBoardType[]>> => {
  const teams = await TeamModel.findAll();
  const matches = await MatchModel.findAll();

  const data = leaderboardUtils.leaderBoardResults(teams, matches, from);

  return { status: 'successful', data };
};

const getAllTeamsPerfomance = async (
  from1: FromType,
  from2: FromType,
): Promise<ServiceResponse<LeaderBoardType[]>> => {
  const teams = await TeamModel.findAll();
  const matches = await MatchModel.findAll();

  const homeTeams = leaderboardUtils.leaderBoardResults(teams, matches, from1);
  const awayTeams = leaderboardUtils.leaderBoardResults(teams, matches, from2);

  const data = leaderboardUtilsAll.generalPerformances(homeTeams, awayTeams);

  return { status: 'successful', data };
};

export default {
  getTeamsPerformance,
  getAllTeamsPerfomance,
};
