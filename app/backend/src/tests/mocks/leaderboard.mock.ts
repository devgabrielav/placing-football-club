const teamsResult = [
  {
    id: 1,
    teamName: 'Avaí/Kindermann',
  },
  {
    id: 2,
    teamName: 'Bahia',
  },
  {
    id: 8,
    teamName: 'Santos',
  },
  {
    id: 9,
    teamName: 'Palmeiras',
  },
];

const matchesResult = [
  {
    id: 1,
    homeTeamId: 1,
    homeTeamGoals: 2,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    id: 2,
    homeTeamId: 1,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: false,
  },
  {
    id: 3,
    homeTeamId: 2,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: false,
  },
  {
    id: 4,
    homeTeamId: 2,
    homeTeamGoals: 0,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: false,
  },
  {
    id: 5,
    homeTeamId: 2,
    homeTeamGoals: 0,
    awayTeamId: 8,
    awayTeamGoals: 3,
    inProgress: false,
  },
];

const mockResultHome = [
  { 
    name: 'Avaí/Kindermann',
    totalPoints: 6,
    totalGames: 2,
    totalVictories: 2,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 4,
    goalsOwn: 1,
    goalsBalance: 3,
    efficiency: '100.00',
  },
  { 
    name: 'Bahia',
    totalPoints: 4,
    totalGames: 3,
    totalVictories: 1,
    totalDraws: 1,
    totalLosses: 1,
    goalsFavor: 2,
    goalsOwn: 3,
    goalsBalance: -1,
    efficiency: '44.44',
  },
];

const mockResultAway = [
  { 
    name: 'Santos',
    totalPoints: 3,
    totalGames: 2,
    totalVictories: 1,
    totalDraws: 0,
    totalLosses: 1,
    goalsFavor: 4,
    goalsOwn: 2,
    goalsBalance: 2,
    efficiency: '50.00',
  },
  { 
    name: 'Palmeiras',
    totalPoints: 1,
    totalGames: 3,
    totalVictories: 0,
    totalDraws: 1,
    totalLosses: 2,
    goalsFavor: 0,
    goalsOwn: 4,
    goalsBalance: -4,
    efficiency: '11.11',
  },
];

const mockResultAll = [
  { 
    name: 'Avaí/Kindermann',
    totalPoints: 6,
    totalGames: 2,
    totalVictories: 2,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 4,
    goalsOwn: 1,
    goalsBalance: 3,
    efficiency: '100.00',
  },
  { 
    name: 'Bahia',
    totalPoints: 4,
    totalGames: 3,
    totalVictories: 1,
    totalDraws: 1,
    totalLosses: 1,
    goalsFavor: 2,
    goalsOwn: 3,
    goalsBalance: -1,
    efficiency: '44.44',
  },
  { 
    name: 'Santos',
    totalPoints: 3,
    totalGames: 2,
    totalVictories: 1,
    totalDraws: 0,
    totalLosses: 1,
    goalsFavor: 4,
    goalsOwn: 2,
    goalsBalance: 2,
    efficiency: '50.00',
  },
  { 
    name: 'Palmeiras',
    totalPoints: 1,
    totalGames: 3,
    totalVictories: 0,
    totalDraws: 1,
    totalLosses: 2,
    goalsFavor: 0,
    goalsOwn: 4,
    goalsBalance: -4,
    efficiency: '11.11',
  },
];

export default {
  teamsResult,
  matchesResult,
  mockResultHome,
  mockResultAway,
  mockResultAll,
};