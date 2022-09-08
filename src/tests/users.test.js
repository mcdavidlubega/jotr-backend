/* eslint-disable no-undef */
import mongoose from 'mongoose';
import testBase from './index';
import { uIds, createUsers, deleteUsers } from './testdata/userTestData';

describe('User tests', () => {
  const { uid1 } = uIds;
  let token;

  beforeAll((done) => {
    done();
  });
  beforeEach(async function () {
    await createUsers();
  });
  afterEach(async function () {
    await deleteUsers();
  });
  afterAll((done) => {
    mongoose.connection.close();
    done();
  });

  it('should register a user if user provides a unique email', async () => {
    const res = await testBase.post('/users/register').send({
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
    const res = await testBase.post('/users/register').send({
      userName: 'user10',
      email: 'user1@gmail.com',
      password: '12345678',
      firstName: 'user',
      lastName: 'one',
    });
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({ message: 'Email already in use' });
  });

  it('it should not register the user if they dont provide a unique username', async () => {
    const res = await testBase.post('/users/register').send({
      userName: 'user1',
      email: 'user11@gmail.com',
      password: '12345678',
      firstName: 'user',
      lastName: 'one',
    });
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({ message: 'Username already in use' });
  });

  it('should get the user profile', async () => {
    const res = await testBase.get('/users/profile/user1');
    expect(res.status).toEqual(200);
    expect(res.body).toMatchObject({
      _id: uid1,
      userName: 'user1',
      email: 'user1@gmail.com',
    });
  });

  it('should not get the user profile if the wrong username is provided', async () => {
    const res = await testBase.get('/users/profile/user9');
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({ message: 'User not found' });
  });

  it('should update the profile if the user is logged in', async () => {
    const login = await testBase
      .post('/auth/login')
      .send({ email: 'user1@gmail.com', password: '12345678' });
    token = login.body.token;
    const res = await testBase
      .patch('/users/profile/user1')
      .set({ 'x_auth-token': token })
      .send({
        firstName: 'NewUser',
        lastName: 'NewOne',
        socialMedia: [
          'https://facebook.com',
          'https://instagram.com',
          'https://twitter.com',
        ],
        bio: 'Lorem ipsum dolor sit amet, consectetur.',
        website: 'https://google.com',
        tel: '+256789836634',
      });

    expect(res.status).toEqual(200);
    expect(res.body).toMatchObject({
      firstName: 'NewUser',
      lastName: 'NewOne',
      socialMedia: [
        'https://facebook.com',
        'https://instagram.com',
        'https://twitter.com',
      ],
      bio: 'Lorem ipsum dolor sit amet, consectetur.',
      website: 'https://google.com',
      tel: '+256789836634',
    });
  });

  it('should not update the profile if the user is logged in', async () => {
    const res = await testBase.patch('/users/profile/user1').send({
      firstName: 'NewUser',
      lastName: 'NewOne',
      socialMedia: [
        'https://facebook.com',
        'https://instagram.com',
        'https://twitter.com',
      ],
      bio: 'Lorem ipsum dolor sit amet, consectetur.',
      website: 'https://google.com',
      tel: '+256789836634',
    });

    expect(res.status).toEqual(401);
    expect(res.body).toEqual({ message: 'Access denied' });
  });

  it('should not update the profile if the token user cannot be verified', async () => {
    token = 'fake token';
    const res = await testBase
      .patch('/users/profile/user1')
      .set({ 'x_auth-token': token })
      .send({
        firstName: 'NewUser',
        lastName: 'NewOne',
        socialMedia: [
          'https://facebook.com',
          'https://instagram.com',
          'https://twitter.com',
        ],
        bio: 'Lorem ipsum dolor sit amet, consectetur.',
        website: 'https://google.com',
        tel: '+256789836634',
      });

    expect(res.status).toEqual(400);
    expect(res.text).toEqual('Invalid Token');
  });

  it('should not update the profile if the user is not the owner', async () => {
    const login = await testBase
      .post('/auth/login')
      .send({ email: 'user2@gmail.com', password: '12345678' });
    token = login.body.token;

    const res = await testBase
      .patch('/users/profile/user1')
      .set({ 'x_auth-token': token })
      .send({
        firstName: 'NewUser',
        lastName: 'NewOne',
        socialMedia: [
          'https://facebook.com',
          'https://instagram.com',
          'https://twitter.com',
        ],
        bio: 'Lorem ipsum dolor sit amet, consectetur.',
        website: 'https://google.com',
        tel: '+256789836634',
      });

    expect(res.status).toEqual(401);
    expect(res.body).toEqual({ message: 'Not authorized' });
  });
});
