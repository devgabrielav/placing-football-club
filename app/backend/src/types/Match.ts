export type Match = {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
};

export type MatchGoals = {
  homeTeamGoals: number,
  awayTeamGoals: number,
};
