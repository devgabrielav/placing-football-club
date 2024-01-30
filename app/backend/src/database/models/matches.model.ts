import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import db from './index';
import { Match } from '../../types/Match';

export type MatchInputtableFields = Optional<Match, 'id'>;

type MatchSequelizeModelCreator = ModelDefined<Match, MatchInputtableFields>;

export type MatchSequelizeModel = Model<Match, MatchInputtableFields>;

const MatchModel: MatchSequelizeModelCreator = db.define('Match', {
  homeTeamId: DataTypes.INTEGER,
  homeTeamGoals: DataTypes.INTEGER,
  awayTeamId: DataTypes.INTEGER,
  awayTeamGoals: DataTypes.INTEGER,
  inProgress: DataTypes.BOOLEAN,
}, {
  tableName: 'matches',
  timestamps: false,
  underscored: true,
});

export default MatchModel;
