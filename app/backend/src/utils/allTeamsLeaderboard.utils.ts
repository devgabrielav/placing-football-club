import { LeaderBoardType } from '../types/LeaderBoard';
import leaderboardUtils from './leaderboardUtils';

const mapTeam = (team: LeaderBoardType, foundTeam: LeaderBoardType): LeaderBoardType => {
  if (team.name === foundTeam.name) {
    const totalPoints = foundTeam.totalPoints + team.totalPoints;
    const totalGames = foundTeam.totalGames + team.totalGames;
    const result = {
      ...foundTeam,
      totalPoints,
      totalGames,
      totalVictories: foundTeam.totalVictories + team.totalVictories,
      totalDraws: foundTeam.totalDraws + team.totalDraws,
      totalLosses: foundTeam.totalLosses + team.totalLosses,
      goalsFavor: foundTeam.goalsFavor + team.goalsFavor,
      goalsOwn: foundTeam.goalsOwn + team.goalsOwn,
      goalsBalance: foundTeam.goalsBalance + team.goalsBalance,
      efficiency: leaderboardUtils.efficiencyCalculator(totalPoints, totalGames),
    }; return result;
  } return team;
};
const generalPerformances = (
  matchesHomeTeams: LeaderBoardType[],
  matchesAwayTeams: LeaderBoardType[],
): LeaderBoardType[] => {
  const allTeams: LeaderBoardType[] = [];

  matchesHomeTeams.forEach((team) => { allTeams.push(team); });

  matchesAwayTeams.forEach((team) => {
    const awayExistsInArray = allTeams.find((teamInMatch) => teamInMatch.name === team.name);
    if (awayExistsInArray) {
      const index = allTeams.findIndex((objToReplace) => objToReplace.name === team.name);
      const replacer = mapTeam(team, awayExistsInArray);
      allTeams.splice(index, 1, replacer);
    } else {
      allTeams.push(team);
    }
  });

  const sorted = leaderboardUtils.sortTeams(allTeams);

  return sorted;
};

export default {
  generalPerformances,
};
