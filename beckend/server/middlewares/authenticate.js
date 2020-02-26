import jwt from 'jsonwebtoken';
import {jwtSecret} from '../config'


export default ctx => {
  if (ctx.request.body.password === 'password') {
    ctx.status = 200;
    ctx.body = {
      token: jwt.sign(
          {
            role: 'admin'
          },
          jwtSecret
      ), // Store this key in an environment variable
      message: 'Successful Authentication'
    };
  } else {
    ctx.status = 401;
    ctx.body = {
      message: 'Authentication Failed'
    };
  }
  return ctx;
};
