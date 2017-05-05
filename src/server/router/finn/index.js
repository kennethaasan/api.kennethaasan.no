import { Router } from 'express';
import { send403, send200 } from '../responses';
import getFinnAd from '../../../finn';

const finn = new Router();

// params
const ID = 'id';

finn.param(ID, (req, res, next, id) => {
  if (!new RegExp('^[0-9]{1,12}$', 'i').test(id)) {
    return send403(res, 'Invalid id');
  }

  return next();
});

finn.get(`/:${ID}`, (req, res, next) => {
  getFinnAd(req.params.id).then(text => send200(res, text)).catch(next);
});

export default finn;
