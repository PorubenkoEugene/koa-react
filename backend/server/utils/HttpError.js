import { HTTP_STATUS } from './constants';

export default class HttpError extends Error {
  constructor({ status = HTTP_STATUS.SERVER_ERROR, code, message }) {
    super();
    this.status = status;
    this.code = code;
    this.message = message;
  }
}


