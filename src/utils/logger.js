import { green, red, yellow, blue } from 'chalk';

function messageToJSON(message = {}, req, params) {
  if (process.env.NODE_ENV !== 'production') {
    return message.stack || message.message || message;
  }

  let log = {
    '@timestamp': new Date(Date.now()).toISOString(),
    '@message': message.message || message,
    '@stack': message.stack,
  };

  if (req) {
    log = Object.assign(log, {
      '@request': req.url,
      '@request_method': req.method,
      '@status': req.status || 500,
    });
  }

  if (req && req.headers) {
    log = Object.assign(log, {
      '@http_host': req.headers.host,
      '@http_user_agent': req.headers['user-agent'],
    });
  }

  if (params) {
    log = Object.assign(log, {
      '@params': params,
    });
  }

  return JSON.stringify(log);
}

export const log = (message, req, params) =>
  console.log(green(messageToJSON(message, req, params))); // eslint-disable-line no-console
export const logError = (message, req, params) =>
  console.error(red(messageToJSON(message, req, params))); // eslint-disable-line no-console
export const logWarn = (message, req, params) =>
  console.warn(yellow(messageToJSON(message, req, params))); // eslint-disable-line no-console
export const logInfo = (message, req, params) =>
  console.info(blue(messageToJSON(message, req, params))); // eslint-disable-line no-console
