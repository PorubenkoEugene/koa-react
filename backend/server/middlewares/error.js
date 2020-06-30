import HttpError from '../utils/HttpError';
import { HTTP_STATUS } from '../utils/constants';

export default async (ctx, next) => {
  return await next().catch(e => {
    if (e instanceof HttpError) {
      const { status, code, message } = e;
      ctx.status = status;
      ctx.body = { error: { code, message } };
    } else {
      ctx.status = HTTP_STATUS.SERVER_ERROR;
      ctx.body = {
        error: { message: 'Server error' }
      };
    }
  });
};
