import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchModel from '../database/models/matches.model';
import matchesMock from './mocks/matches.mock';
import TeamModel from '../database/models/teams.model';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rotas match', function () {
  beforeEach(function () { sinon.restore(); });

  describe('GET /matches', function() {
    it('Busca todas as as partidas com os respectivos times', async function () {
      const mockBuild = MatchModel.bulkBuild(matchesMock.allMatches, {
        include: [
          {
            model: TeamModel,
            as: 'homeTeam',
            attributes: ['teamName'],
          },
          {
            model: TeamModel,
            as: 'awayTeam',
            attributes: ['teamName'],
          },
        ],
      });
      sinon.stub(MatchModel, 'findAll').resolves(mockBuild);
  
      const response = await chai.request(app).get('/matches').send();
  
      expect(response.status).to.equal(200);
      expect(response.body).to.eql(matchesMock.allMatches);
    });

    it('Busca todas as partidas em progresso', async function() {
      const mockBuild = MatchModel.bulkBuild(matchesMock.allMatchesTrue, {
        include: [
          {
            model: TeamModel,
            as: 'homeTeam',
            attributes: ['teamName'],
          },
          {
            model: TeamModel,
            as: 'awayTeam',
            attributes: ['teamName'],
          },
        ],
      });
      sinon.stub(MatchModel, 'findAll').resolves(mockBuild);
  
      const response = await chai.request(app).get('/matches?inProgress=true').send();
  
      expect(response.status).to.equal(200);
      expect(response.body).to.eql(matchesMock.allMatchesTrue);
    });

    it('Busca todas as partidas finalizadas', async function() {
      const mockBuild = MatchModel.bulkBuild(matchesMock.allMatchesFalse, {
        include: [
          {
            model: TeamModel,
            as: 'homeTeam',
            attributes: ['teamName'],
          },
          {
            model: TeamModel,
            as: 'awayTeam',
            attributes: ['teamName'],
          },
        ],
      });
      sinon.stub(MatchModel, 'findAll').resolves(mockBuild);
  
      const response = await chai.request(app).get('/matches?inProgress=false').send();

      expect(response.status).to.equal(200);
      expect(response.body).to.eql(matchesMock.allMatchesFalse);
    });

  });

  describe('PATCH /matches/:id/finish', function () {
    it('Muda o status da partida com sucesso', async function () {
      const mockBuild = MatchModel.build(matchesMock.matchToUpdate);
      sinon.stub(MatchModel, 'findOne').resolves(mockBuild);
      const response = await chai.request(app).patch(`/matches/${1}/finish`)
      .set('authorization', matchesMock.token).send();

      expect(response.status).to.equal(200);
      expect(response.body).to.eql({ message: 'Finished' });
    });

    it('Ao passar um id inválido, retorna um erro', async function () {
      sinon.stub(MatchModel, 'findOne').resolves(null);
      const response = await chai.request(app).patch(`/matches/${1}/finish`)
      .set('authorization', matchesMock.token).send();

      expect(response.status).to.equal(404);
      expect(response.body).to.eql({ message: 'There is no match with such id!' });
    });

    it('Ao tentar atualizar o status da partida sem token, retorna erro', async function () {
      const response = await chai.request(app).patch(`/matches/${1}/finish`).send();

      expect(response.status).to.equal(401);
      expect(response.body).to.eql({ message: 'Token not found' });
    });

    it('Ao tentar atualiza o status da partida com um token inválido, retorna erro', async function() {
      const response = await chai.request(app).patch(`/matches/${1}/finish`)
      .set('authorization', 'Bearer asasfasfafgg').send();

      expect(response.status).to.equal(401);
      expect(response.body).to.eql({ message: 'Token must be a valid token' });
    });
  });

  describe('PATCH /matches/:id', function () {
    it('Ao passar um id inválido, retorna um erro', async function () {
      const requestBody = matchesMock.correctBody;
      sinon.stub(MatchModel, 'findOne').resolves(null);
      const response = await chai.request(app).patch(`/matches/${3}`)
      .set('authorization', matchesMock.token).send(requestBody);

      expect(response.status).to.equal(404);
      expect(response.body).to.eql({ message: 'There is no match with such id!' });
    });

    it('Ao não passar a chave homeTeamGoals, retorna um erro', async function() {
      const requestBody = matchesMock.bodyWithNoHomeTeamGoals;
      const mockBuild = MatchModel.build(matchesMock.matchToUpdate);
      sinon.stub(MatchModel, 'findOne').resolves(mockBuild);
      const response = await chai.request(app).patch(`/matches/${1}`)
      .set('authorization', matchesMock.token).send(requestBody);

      expect(response.status).to.equal(400);
      expect(response.body).to.eql({ message: 'homeTeamGoals and awayTeamGoals, are required!' });
    });

    it('Ao não passar a chave awayTeamGoals, retorna um erro', async function() {
      const requestBody = matchesMock.bodyWithNoAwayTeamGoals;
      const mockBuild = MatchModel.build(matchesMock.matchToUpdate);
      sinon.stub(MatchModel, 'findOne').resolves(mockBuild);
      const response = await chai.request(app).patch(`/matches/${1}`)
      .set('authorization', matchesMock.token).send(requestBody);

      expect(response.status).to.equal(400);
      expect(response.body).to.eql({ message: 'homeTeamGoals and awayTeamGoals, are required!' });
    });

    it('Ao passar as chaves corretamente, atualiza os gols com sucesso', async function() {
      const requestBody = matchesMock.correctBody;
      const mockBuild = MatchModel.build(matchesMock.matchToUpdate);
      sinon.stub(MatchModel, 'findOne').resolves(mockBuild);
      const response = await chai.request(app).patch(`/matches/${1}`)
      .set('authorization', matchesMock.token).send(requestBody);

      expect(response.status).to.equal(200);
      expect(response.body).to.eql({ message: 'Goals updated!' });
    });
  });
});