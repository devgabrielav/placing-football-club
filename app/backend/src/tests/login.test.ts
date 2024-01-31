import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import loginMocks from './mocks/login.mock';
import UserModel from '../database/models/users.model';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', function () {
  beforeEach(function () { sinon.restore(); });
  
  it('Ao não receber um email, retorna um erro', async function () {
    const requestBody = loginMocks.noEmailBody;

    const response = await chai.request(app).post('/login').send(requestBody);

    expect(response.status).to.equal(400);
    expect(response.body).to.eql({ message: 'All fields must be filled' });
  });

  it('Ao não receber uma senha, retorna um erro', async function () {
    const requestBody = loginMocks.noPasswordBody;

    const response = await chai.request(app).post('/login').send(requestBody);

    expect(response.status).to.equal(400);
    expect(response.body).to.eql({ message: 'All fields must be filled' });
  });

  it('Ao receber um email em formato inválido, retorna um erro', async function () {
    const requestBody = loginMocks.invalidFormatEmail;

    const response = await chai.request(app).post('/login').send(requestBody);

    expect(response.status).to.equal(401);
    expect(response.body).to.eql({ message: 'Invalid email or password' });
  });

  it('Ao receber um password em formato inválido, retorna um erro', async function () {
    const requestBody = loginMocks.invalidLengthPassword;

    const response = await chai.request(app).post('/login').send(requestBody);

    expect(response.status).to.equal(401);
    expect(response.body).to.eql({ message: 'Invalid email or password' });
  });

  it('Ao receber um email inválido, retorna um erro', async function () {
    const requestBody = loginMocks.invalidEmailBody;
    sinon.stub(UserModel, 'findOne').resolves(null);

    const response = await chai.request(app).post('/login').send(requestBody);

    expect(response.status).to.equal(401);
    expect(response.body).to.eql({ message: 'Invalid email or password' });
  });

  it('Ao receber o email correto, mas senha inválida, retorna um erro', async function () {
    const requestBody = loginMocks.invalidPasswordBody;
    const mockReturn = UserModel.build(loginMocks.existingUser);
    sinon.stub(UserModel, 'findOne').resolves(mockReturn);

    const response = await chai.request(app).post('/login').send(requestBody);

    expect(response.status).to.equal(401);
    expect(response.body).to.eql({ message: 'Invalid email or password' });
  });

  it('Ao receber email e senha corretos, recebe um token', async function () {
    const requestBody = loginMocks.validLogin;
    const mockReturn = UserModel.build(loginMocks.existingUser);
    sinon.stub(UserModel, 'findOne').resolves(mockReturn);

    const response = await chai.request(app).post('/login').send(requestBody);
    
    expect(response.status).to.equal(200);
    expect(response.body).to.have.key('token');
  });
});