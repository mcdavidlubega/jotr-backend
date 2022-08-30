import request from 'supertest';
import app from '../app';
import { createUsers, deleteUsers } from './testdata/userTestData';

// eslint-disable-next-line no-undef
describe('User tests', () => {
  // eslint-disable-next-line no-unused-vars
  let token;
  // eslint-disable-next-line func-names, no-undef
  beforeEach(async function () {
    await createUsers();
  });
  // eslint-disable-next-line func-names, no-undef
  afterEach(async function () {
    await deleteUsers();
  });

  // eslint-disable-next-line no-undef
  it('should register a user if user provides a uniue email', async () => {
    const res = await request(app).post('/api/v1/users').send({
      userName: 'user9',
      email: 'user9@gmail.com',
      password: '12345678',
      firstName: 'user',
      lastName: 'nine',
    });
    // eslint-disable-next-line no-undef
    expect(res.status).toEqual(201);
    // eslint-disable-next-line no-undef
    expect(res.body).toEqual({
      Username: 'user9',
      Email: 'user9@gmail.com',
      Password: '********',
      'First Name': 'user',
      'Last Name': 'nine',
    });
  });
});
