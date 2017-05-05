import { Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import User from '../../../models/User';
import Home from '../../../models/Home';
import Letting from '../../../models/Letting';
import { send200Success, send200Token, send401 } from '../responses';
import { auth as authMiddleware } from '../middlewares';

export const SECRET = process.env.SECRET || 'byggreal';

const auth = new Router();

auth.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return send401(res);
    }

    // 30 days: https://github.com/zeit/ms
    const token = jwt.sign({ username: user.username }, SECRET, {
      expiresIn: '30d',
    });

    // Now + 30 days
    const expires = Date.now() + 2592000000;

    return send200Token(res, token, expires);
  })(req, res, next);
});

auth.post('/verify', (req, res) =>
  authMiddleware(req, res, () => {
    send200Success(res, 'Token is valid');
  })
);

if (process.env.NODE_ENV === 'development') {
  auth.get('/setup', (req, res, next) => {
    const password = 'admin';

    User.remove({})
      .then(() => {
        User.register(
          new User({ username: 'admin' }),
          password,
          (err, user) => {
            if (err) {
              return next(err);
            }

            return send200Success(
              res,
              `User with username ${user.username} and password ${password} created`
            );
          }
        );
      })
      .catch(next);
  });

  auth.get('/cleanup', (req, res, next) => {
    User.remove({}).then(send200Success(res, 'Cleanup done')).catch(next);
  });

  auth.get('/setup-homes', (req, res, next) => {
    const finnkoder = [
      75735376,
      85354168,
      85425584,
      85556577,
      85556313,
      85555605,
      85457532,
    ];

    Home.remove({})
      .then(() =>
        Promise.all(
          finnkoder.map((finnkode, order) =>
            new Home({
              finnkode,
              order,
            }).save()
          )
        )
      )
      .then(() => send200Success(res, 'Some homes created'))
      .catch(next);
  });

  auth.get('/setup-lettings', (req, res, next) => {
    const finnkoder = [
      85557708,
      85554361,
      85552761,
      85551968,
      85544454,
      85549462,
    ];

    Letting.remove({})
      .then(() =>
        Promise.all(
          finnkoder.map((finnkode, order) =>
            new Letting({
              finnkode,
              order,
            }).save()
          )
        )
      )
      .then(() => send200Success(res, 'Some lettings created'))
      .catch(next);
  });
}

export default auth;
