/* eslint-disable func-names */
/* eslint-disable no-undef */
import testBase from './index';
import { createUsers, deleteUsers } from './testdata/userTestData';

describe('User tests', () => {
  beforeEach(async function () {
    await createUsers();
  });
  afterEach(async function () {
    await deleteUsers();
  });

  it('should register a user if user provides a unique email', async () => {
    const res = await testBase.post('/users').send({
      userName: 'user9',
      email: 'user9@gmail.com',
      password: '12345678',
      firstName: 'user',
      lastName: 'nine',
    });
    expect(res.status).toEqual(201);
    expect(res.body).toEqual({
      Username: 'user9',
      Email: 'user9@gmail.com',
      Password: '********',
      'First Name': 'user',
      'Last Name': 'nine',
    });
  });

  it('it should not register the user if they dont provide a unique email', async () => {
    const res = await testBase.post('/users').send({
      userName: 'user1',
      email: 'user1@gmail.com',
      password: '12345678',
      firstName: 'user',
      lastName: 'one',
    });
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({ message: 'User already registered' });
  });
});
