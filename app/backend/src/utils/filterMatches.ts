import { MatchSequelizeModel } from '../database/models/matches.model';

const filterMatch = (
  query: string,
  matches: MatchSequelizeModel[],
): MatchSequelizeModel[] => (query === 'true' ? (
  matches.filter((match) => match.dataValues.inProgress === true)
) : (
  matches.filter((match) => match.dataValues.inProgress === false)
));

export default filterMatch;
