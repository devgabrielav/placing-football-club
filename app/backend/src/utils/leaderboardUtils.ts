import { GoalsType, LeaderBoardType, TotalPointsType } from '../types/LeaderBoard';
import { MatchSequelizeModel } from '../database/models/matches.model';
import { TeamSequelizeModel } from '../database/models/teams.model';

const filteredMatches = (matches: MatchSequelizeModel[], team: TeamSequelizeModel) => {
  const filtered = matches.filter((match) =>
    (match.dataValues.homeTeamId === team.dataValues.id));
  return filtered;
};

const gameResultsCalculator = (matches: MatchSequelizeModel[]): TotalPointsType => {
  let total = 0;
  let wins = 0;
  let losses = 0;
  let draws = 0;

  matches.forEach((match) => {
    if (match.dataValues.homeTeamGoals > match.dataValues.awayTeamGoals) {
      total += 3; wins += 1;
    }
    if (match.dataValues.homeTeamGoals < match.dataValues.awayTeamGoals) {
      total += 0; losses += 1;
    }
    if (match.dataValues.homeTeamGoals === match.dataValues.awayTeamGoals) {
      total += 1; draws += 1;
    }
  });
  return { total, wins, losses, draws };
};

const goalsCalculator = (matches: MatchSequelizeModel[]): GoalsType => {
  let favor = 0;
  let own = 0;

  matches.forEach((match) => {
    favor += match.dataValues.homeTeamGoals;
    own += match.dataValues.awayTeamGoals;
  });

  return {
    favor,
    own,
  };
};

const efficiencyCalculator = (totalPoints: number, totalGames: number): string => {
  const calculo = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
  return calculo;
};

const goalsBalanceCalculator = (goalsFavor: number, goalsOwn: number) => {
  const calculo = goalsFavor - goalsOwn;
  return calculo;
};

const mappedTeams = (
  matches: MatchSequelizeModel[],
  team: TeamSequelizeModel,
): LeaderBoardType => {
  const gameResults = gameResultsCalculator(matches);
  const goalsResults = goalsCalculator(matches);
  const result = {
    name: team.dataValues.teamName,
    totalPoints: gameResults.total,
    totalGames: matches.length,
    totalVictories: gameResults.wins,
    totalDraws: gameResults.draws,
    totalLosses: gameResults.losses,
    goalsFavor: goalsResults.favor,
    goalsOwn: goalsResults.own,
    goalsBalance: goalsBalanceCalculator(goalsResults.favor, goalsResults.own),
    efficiency: efficiencyCalculator(gameResults.total, matches.length),
  }; return result;
};

const sortTeams = (teams: LeaderBoardType[]): LeaderBoardType[] => {
  const sorted = teams.sort((teamA, teamB) => {
    if (teamA.totalPoints > teamB.totalPoints) {
      return -1;
    }
    if (teamA.totalPoints === teamB.totalPoints) {
      if (teamA.totalVictories > teamB.totalVictories) {
        return -1;
      }
      if (teamA.totalVictories === teamB.totalVictories
        && teamA.goalsBalance === teamB.goalsBalance) {
        return teamA.goalsFavor > teamB.goalsFavor ? -1 : 1;
      }
      return teamA.goalsBalance > teamB.goalsBalance ? -1 : 1;
    }
    return 0;
  });
  return sorted;
};

const leaderBoardResults = async (
  teams: TeamSequelizeModel[],
  matches: MatchSequelizeModel[],
): Promise<LeaderBoardType[]> => {
  const finishedMatches = matches.filter((match) => match.dataValues.inProgress === false);

  const leaderBoardTeams = teams.map((team) => {
    const totalGames = filteredMatches(finishedMatches, team);
    const result = mappedTeams(totalGames, team);
    return result;
  });

  const sortedLeaderBoardTeams = sortTeams(leaderBoardTeams);

  return sortedLeaderBoardTeams;
};

export default {
  leaderBoardResults,
};
