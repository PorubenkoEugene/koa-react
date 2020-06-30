import 'babel-polyfill';
import Router from 'koa-router';
import { baseApi } from '../config';
import UsersAuthControllers from "../controllers/auth/auth";
import jwt from "../middlewares/jwt";

const api = 'login';

const router = new Router();

router.prefix(`/${baseApi}/${api}`);


router.post('/',  UsersAuthControllers.login);
router.get('/', async (ctx)=>{
    ctx.body='koko';
});





export default router;
