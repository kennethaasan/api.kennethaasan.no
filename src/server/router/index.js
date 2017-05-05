import { Router } from 'express';
import auth from './auth';
import finn from './finn';
import { logError } from '../../utils/logger';
import { send404, send500 } from './responses';
import homes from './homes';
import lettings from './lettings';

const api = new Router();

api.use((req, res, next) => {
  // CORS on ExpressJS
  // http://enable-cors.org/server_expressjs.html
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  return next();
});

api.use('/auth', auth);
api.use('/homes', homes);
api.use('/lettings', lettings);
api.use('/finn', finn);

api.get('/*', (req, res) => send404(res));

api.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  logError(err, req);

  send500(res, err.stack || err.message || err);
});

export default api;
