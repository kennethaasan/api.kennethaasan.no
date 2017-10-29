import { Router } from 'express';
import Home from '../../../models/Home';
import { send200Auth } from '../responses';
import { auth } from '../middlewares';

const homesRouter = new Router();

homesRouter
  .route('/')
  .get((req, res, next) =>
    Home.find({}, null, { sort: { order: 'asc' } })
      .then(homes =>
        send200Auth(res, {
          homes,
        })
      )
      .catch(next)
  )
  .post(auth, (req, res, next) =>
    new Home(req.body)
      .save()
      .then(home =>
        send200Auth(res, {
          home,
        })
      )
      .catch(next)
  );

homesRouter
  .route('/:homeId')
  .get((req, res, next) =>
    Home.findById(req.params.homeId)
      .then(home =>
        send200Auth(res, {
          home,
        })
      )
      .catch(next)
  )
  .put(auth, (req, res, next) =>
    Home.findById(req.params.homeId)
      .then(home =>
        Object.assign(home, req.body)
          .save()
          .then(homeUpdated =>
            send200Auth(res, {
              home: homeUpdated,
            })
          )
      )
      .catch(next)
  )
  .delete(auth, (req, res, next) =>
    Home.remove({
      _id: req.params.homeId,
    })
      .then(home =>
        send200Auth(res, {
          home,
        })
      )
      .catch(next)
  );

export default homesRouter;
