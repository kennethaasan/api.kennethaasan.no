import { Router } from 'express';
import Letting from '../../../models/Letting';
import { send200Auth } from '../responses';
import { auth } from '../middlewares';

const lettingsRouter = new Router();

lettingsRouter
  .route('/')
  .get((req, res, next) =>
    Letting.find({}, null, { sort: { order: 'asc' } })
      .then(lettings =>
        send200Auth(res, {
          lettings,
        })
      )
      .catch(next)
  )
  .post(auth, (req, res, next) =>
    new Letting(req.body)
      .save()
      .then(letting =>
        send200Auth(res, {
          letting,
        })
      )
      .catch(next)
  );

lettingsRouter
  .route('/:lettingId')
  .get((req, res, next) =>
    Letting.findById(req.params.lettingId)
      .then(letting =>
        send200Auth(res, {
          letting,
        })
      )
      .catch(next)
  )
  .put(auth, (req, res, next) =>
    Letting.findById(req.params.lettingId)
      .then(letting =>
        Object.assign(letting, req.body).save().then(lettingUpdated =>
          send200Auth(res, {
            letting: lettingUpdated,
          })
        )
      )
      .catch(next)
  )
  .delete(auth, (req, res, next) =>
    Letting.remove({
      _id: req.params.lettingId,
    })
      .then(letting =>
        send200Auth(res, {
          letting,
        })
      )
      .catch(next)
  );

export default lettingsRouter;
