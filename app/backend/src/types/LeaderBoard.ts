export type LeaderBoardType = {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string,
};

export type LeaderBoardReducedType = {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
};

export type TotalPointsType = {
  total: number,
  wins: number,
  losses: number,
  draws: number,
};

export type GoalsType = {
  favor: number,
  own: number,
};

export type FromType = 'home' | 'away';
