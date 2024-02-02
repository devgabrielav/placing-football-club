import { GoalsType, LeaderBoardType, TotalPointsType, FromType } from '../types/LeaderBoard';
import { MatchSequelizeModel } from '../database/models/matches.model';
import { TeamSequelizeModel } from '../database/models/teams.model';

const filteredMatches = (
  matches: MatchSequelizeModel[],
  team: TeamSequelizeModel,
  from: FromType,
) => {
  const filtered = matches.filter((match) =>
    (
      from === 'home' ? (match.dataValues.homeTeamId === team.dataValues.id) : (
        match.dataValues.awayTeamId === team.dataValues.id
      )
    ));
  return filtered;
};

const gameResultsCalculator = (matches: MatchSequelizeModel[], from: FromType): TotalPointsType => {
  const beforeKey = from === 'home' ? 'homeTeamGoals' : 'awayTeamGoals';
  const afterKey = from === 'home' ? 'awayTeamGoals' : 'homeTeamGoals';
  let total = 0;
  let wins = 0;
  let losses = 0;
  let draws = 0;

  matches.forEach((match) => {
    if (match.dataValues[beforeKey] > match.dataValues[afterKey]) {
      total += 3; wins += 1;
    }
    if (match.dataValues[beforeKey] < match.dataValues[afterKey]) {
      total += 0; losses += 1;
    }
    if (match.dataValues[beforeKey] === match.dataValues[afterKey]) {
      total += 1; draws += 1;
    }
  });
  return { total, wins, losses, draws };
};

const goalsCalculator = (matches: MatchSequelizeModel[], from: FromType): GoalsType => {
  const favorKey = from === 'home' ? 'homeTeamGoals' : 'awayTeamGoals';
  const ownKey = from === 'home' ? 'awayTeamGoals' : 'homeTeamGoals';
  let favor = 0;
  let own = 0;

  matches.forEach((match) => {
    favor += match.dataValues[favorKey];
    own += match.dataValues[ownKey];
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
  from: FromType,
): LeaderBoardType => {
  const gameResults = gameResultsCalculator(matches, from);
  const goalsResults = goalsCalculator(matches, from);
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
  from: FromType,
): Promise<LeaderBoardType[]> => {
  const finishedMatches = matches.filter((match) => match.dataValues.inProgress === false);

  const leaderBoardTeams = teams.map((team) => {
    const totalGames = filteredMatches(finishedMatches, team, from);
    const result = mappedTeams(totalGames, team, from);
    return result;
  });

  const sortedLeaderBoardTeams = sortTeams(leaderBoardTeams);

  return sortedLeaderBoardTeams;
};

export default {
  leaderBoardResults,
};
