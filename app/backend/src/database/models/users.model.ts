import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import db from './index';
import { User } from '../../types/User';

export type UserInputtableFields = Optional<User, 'id'>;

type UserSequelizeModelCreator = ModelDefined<User, UserInputtableFields>;

export type UserSequelizeModel = Model<User, UserInputtableFields>;

const UserModel: UserSequelizeModelCreator = db.define('User', {
  username: DataTypes.INTEGER,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  tableName: 'users',
  timestamps: false,
  underscored: false,
});

export default UserModel;
