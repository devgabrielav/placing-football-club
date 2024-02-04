import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/teams.model';
import MatchModel from '../database/models/matches.model';
import leaderboardMock from './mocks/leaderboard.mock';
import leaderboardServices from '../services/leaderboard.services';
import { ServiceResponse } from '../types/ServiceResponse';
import { LeaderBoardType } from '../types/LeaderBoard';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rotas GET leaderboard', function() {
  beforeEach(function () { sinon.restore(); });

  it('Busca na rota /leaderboard/home o leaderboard dos times da casa com sucesso', async function() {
    const mockBuildTeams = TeamModel.bulkBuild(leaderboardMock.teamsResult);
    const mockBuildMatches = MatchModel.bulkBuild(leaderboardMock.matchesResult);
    sinon.stub(TeamModel, 'findAll').resolves(mockBuildTeams);
    sinon.stub(MatchModel, 'findAll').resolves(mockBuildMatches);
    const data: ServiceResponse<LeaderBoardType[]> = { status: 'successful', data: leaderboardMock.mockResultHome };
    sinon.stub(leaderboardServices, 'getTeamsPerformance').resolves(data);

    const response = await chai.request(app).get('/leaderboard/home').send();

    expect(response.status).to.equal(200);
    expect(response.body).to.eql(leaderboardMock.mockResultHome);
  });

  it('Busca na rota /leaderboard/away o leaderboard dos times visitantes com sucesso', async function() {
    const mockBuildTeams = TeamModel.bulkBuild(leaderboardMock.teamsResult);
    const mockBuildMatches = MatchModel.bulkBuild(leaderboardMock.matchesResult);
    sinon.stub(TeamModel, 'findAll').resolves(mockBuildTeams);
    sinon.stub(MatchModel, 'findAll').resolves(mockBuildMatches);
    const data: ServiceResponse<LeaderBoardType[]> = { status: 'successful', data: leaderboardMock.mockResultAway };
    sinon.stub(leaderboardServices, 'getTeamsPerformance').resolves(data);

    const response = await chai.request(app).get('/leaderboard/away').send();

    expect(response.status).to.equal(200);
    expect(response.body).to.eql(leaderboardMock.mockResultAway);
  });

  it('Busca na rota /leaderboard o leaderboard geral dos times', async function() {
    const mockBuildTeams = TeamModel.bulkBuild(leaderboardMock.teamsResult);
    const mockBuildMatches = MatchModel.bulkBuild(leaderboardMock.matchesResult);
    sinon.stub(TeamModel, 'findAll').resolves(mockBuildTeams);
    sinon.stub(MatchModel, 'findAll').resolves(mockBuildMatches);

    const response = await chai.request(app).get('/leaderboard').send();

    expect(response.status).to.equal(200);
    expect(response.body).to.eql(leaderboardMock.mockResultAll);
  });
});