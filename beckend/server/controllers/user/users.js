import User from '../../models/user';
import _ from 'lodash';
import moment from 'moment';
import HttpError from '../../utils/HttpError';
import { HTTP_STATUS } from '../../utils/constants';
import { hash } from '../../utils/utils';
import  {jwtSecret} from '../../config';
import jwt from 'jsonwebtoken';

class UsersControllers {
    /* eslint-disable no-param-reassign */


    /**
     * Add a user
     * @param ctx
     */
    async register(ctx) {
        const { email, password } = ctx.request.body;
        if (_.isNil(email)) {
            throw new HttpError({
                code: 'E001',
                status: HTTP_STATUS.BAD_REQUEST,
                message: 'User name should not be empty'
            });
        }
        if (_.isNil(password)) {
            throw new HttpError({
                code: 'E002',
                status: HTTP_STATUS.BAD_REQUEST,
                message: 'Password should not be empty'
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new HttpError({
                code: 'E003',
                status: HTTP_STATUS.BAD_REQUEST,
                message: `A user with such mail:${email} is already exists `
            });
        }
        const now = new Date();
        const user = new User({ email: email,hashedPassword: hash(password), createdAt: now });
        const insertedUser = await user.save();

        ctx.status = HTTP_STATUS.CREATED;
        ctx.body = {
            userId: insertedUser._id,
            email,
            createdAt: moment(now).format('YYYY-MM-DD HH:mm:ss')
        };
    }

    /**
     * Login a user
     * @param ctx
     */
    async login(ctx) {
        const { email, password } = ctx.request.body;

        if (_.isNil(email)) {
            throw new HttpError({
                code: 'E001',
                status: HTTP_STATUS.BAD_REQUEST,
                message: 'User name should not be empty'
            });
        }

        if (_.isNil(password)) {
            throw new HttpError({
                code: 'E002',
                status: HTTP_STATUS.BAD_REQUEST,
                message: 'Password should not be empty'
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            throw new HttpError({
                code: 'E003',
                status: HTTP_STATUS.UNAUTHORIZED,
                message: `A user with such mail: (${email}) not found`
            });
        }

        const { hashedPassword } = user;

        if (hash(password) !== hashedPassword) {
            throw new HttpError({
                code: 'E004',
                status: HTTP_STATUS.UNAUTHORIZED,
                message: 'Invalid password'
            });
        }

        const now = new Date();

        const payload = {
            email,
            createdAt: moment(now).format('YYYY-MM-DD HH:mm:ss')
        };

        const token = jwt.sign(payload, jwtSecret, {
            expiresIn: '2m'
        });

        ctx.status = HTTP_STATUS.CREATED;
        ctx.body = {
            token
        };
    }

    /* eslint-enable no-param-reassign */
}

export default new UsersControllers();
