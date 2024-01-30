import TeamModel, { TeamSequelizeModel } from '../database/models/teams.model';
import { ServiceResponse } from '../types/ServiceResponse';

const getAllTeams = async (): Promise<ServiceResponse<TeamSequelizeModel[]>> => {
  const teams = await TeamModel.findAll();

  return { status: 'successful', data: teams };
};

const getTeamById = async (id: number): Promise<ServiceResponse<TeamSequelizeModel>> => {
  const team = await TeamModel.findOne({ where: { id } });

  if (!team) {
    return { status: 'notFound', data: { message: 'Time não encontrado' } };
  }

  return { status: 'successful', data: team };
};

export default {
  getAllTeams,
  getTeamById,
};
