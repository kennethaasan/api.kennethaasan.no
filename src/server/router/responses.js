import setAge from './setAge';

export function send200(res, data, age = 600) {
  if (age) {
    setAge(res, age);
  }
  return res.json({
    data,
  });
}

export function send200Auth(res, data) {
  return res.json({
    data,
  });
}

export function send200Success(res, message = 'Success') {
  return res.json({
    data: {
      success: true,
      message,
    },
  });
}

export function send200Token(res, token, expires) {
  return res.json({
    data: {
      success: true,
      message: 'Enjoy tour token',
      token,
      expires,
    },
  });
}

export function send401(res, message = 'Unauthorized') {
  return res.status(401).json({
    data: {
      success: false,
      message,
    },
  });
}

export function send403(res, message = 'No token provided') {
  return res.status(403).json({
    data: {
      success: false,
      message,
    },
  });
}

export function send404(res, message = 'Not found') {
  return res.status(404).json({
    data: {
      success: false,
      message,
    },
  });
}

export function send500(res, message) {
  if (process.env.NODE_ENV === 'production') {
    return res.status(500).json({
      data: {
        success: false,
        message: 'Internal server error',
      },
    });
  }

  return res.status(500).json({
    data: {
      success: false,
      message,
    },
  });
}
