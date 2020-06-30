import 'babel-polyfill';
import Router from 'koa-router';
import { baseApi } from '../config';
import authenticate from '../middlewares/authenticate';
import verify from "../middlewares/verify";
const api = 'verify';

const router = new Router();

router.prefix(`/${baseApi}/${api}`);

// POST /api/authenticate
router.get('/', verify);

export default router;
