import HttpError from "../utils/HttpError";
import {HTTP_STATUS} from "../utils/constants";
import jwt from "jsonwebtoken";
import {jwtSecret} from "../config";
import { Bearer } from 'permit';
const permit = new Bearer({
    query: 'Authorization',
});

/**
 * Verify a user
 * @param ctx
 */

export default ctx => {
    const { req } = ctx;

    const token = permit.check(req);

    if (!token) {
        throw new HttpError({
            status: HTTP_STATUS.UNAUTHORIZED,
            code: 'E001',
            message: 'Authentication required!',
            shouldLog: false
        });
    }

    let payload;
    try {
        payload = jwt.verify(token, jwtSecret);
    } catch (e) {
        throw new HttpError({
            status: HTTP_STATUS.UNAUTHORIZED,
            code: 'E002',
            message: 'Invalid authentication',
            shouldLog: false
        });
    }

    const { email , createdAt } = payload;
    ctx.status = HTTP_STATUS.OK;
    ctx.body = {
        email,
        createdAt
    };
    return ctx;
}
