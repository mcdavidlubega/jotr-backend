import jwt from 'jsonwebtoken';
import verifyToken from '../middleware/verifyToken';
import { uIds } from './testdata/userTestData';

describe('verifyToken tests', () => {
  const { uid1 } = uIds;
  it('Should pass the userId to the request object if token is verified', () => {
    const res = {};
    const req = {
      header: jest.fn(() => 'myAuthToken'),
    };
    const next = jest.fn();

    const verify = jest
      .spyOn(jwt, 'verify')
      .mockReturnValueOnce({ userId: String(uid1) });
    verifyToken(req, res, next);

    expect(req.header).toHaveBeenCalledWith('x_auth-token');
    expect(req.user).toEqual({ userId: String(uid1) });
    expect(next).toHaveBeenCalled();
  });

  it('Should deny access if token is not present in header', () => {
    const res = {
      json(msg) {
        expect(msg).toEqual({ message: 'Access denied' });
      },
      status(responseStatus) {
        expect(responseStatus).toEqual(401);
        return this;
      },
    };
    const req = {
      header: jest.fn(),
    };
    const next = jest.fn();
    verifyToken(req, res, next);
    expect(req.header).toHaveBeenCalledWith('x_auth-token');
    expect(req.user).not.toEqual({ userId: String(uid1) });
  });

  it('Should deny access if token is invalid', () => {
    const res = {
      send(text) {
        expect(text).toEqual('Invalid Token');
      },
      status(responseStatus) {
        expect(responseStatus).toEqual(400);
        return this;
      },
    };
    const req = {
      header: jest.fn(() => 123),
    };
    const next = jest.fn();

    const verify = jest.fn();

    verifyToken(req, res, next);

    expect(req.header).toHaveBeenCalledWith('x_auth-token');
    expect(req.user).not.toEqual({ userId: String(uid1) });
  });
});
