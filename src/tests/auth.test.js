/* eslint-disable func-names */
/* eslint-disable no-undef */
import testBase from './index';
import { createUsers, deleteUsers } from './testdata/userTestData';

describe('Auth test', () => {
  beforeEach(async function () {
    await createUsers();
  });
  afterEach(async function () {
    await deleteUsers();
  });
  it('should login the user if they provide the right username and password', async () => {
    const res = await testBase.post('/auth/login').send({
      email: 'user1@gmail.com',
      password: '12345678',
    });
    expect(res.status).toEqual(200);
    expect(res.body).toMatchObject({
      token: expect.stringMatching(/^(?:[\w-]*\.){2}[\w-]*$/),
    });
  });

  it('should not login the user if they provide the wrong username', async () => {
    const res = await testBase.post('/auth/login').send({
      email: 'user@gmail.com',
      password: '12345678',
    });
    expect(res.status).toEqual(400);
    expect(res.body).toMatchObject({
      message: 'Invalid email or password',
    });
  });

  it('should not login the user if they provide the wrong password', async () => {
    const res = await testBase.post('/auth/login').send({
      email: 'user1@gmail.com',
      password: '123456782',
    });
    expect(res.status).toEqual(400);
    expect(res.body).toMatchObject({
      message: 'Invalid email or password',
    });
  });
});
