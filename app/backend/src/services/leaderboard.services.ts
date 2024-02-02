import TeamModel from '../database/models/teams.model';
import MatchModel from '../database/models/matches.model';
import { ServiceResponse } from '../types/ServiceResponse';
import { LeaderBoardType } from '../types/LeaderBoard';
import leaderboardUtils from '../utils/leaderboardUtils';

const getTeamsPerformance = async (): Promise<ServiceResponse<LeaderBoardType[]>> => {
  const teams = await TeamModel.findAll();
  const matches = await MatchModel.findAll();

  const data = await leaderboardUtils.leaderBoardResults(teams, matches);

  return { status: 'successful', data };
};

export default {
  getTeamsPerformance,
};