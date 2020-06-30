import 'babel-polyfill';
import Router from 'koa-router';
import { baseApi } from '../config';
import jwt from '../middlewares/jwt';
import UsersControllers from '../controllers/users';

const api = 'users';

const router = new Router();

router.prefix(`/${baseApi}/${api}`);

// GET /api/users
router.get('/', UsersControllers.find);

// POST /api/users
// This route is protected, call POST /api/authenticate to get the token
router.post('/', UsersControllers.add);

// GET /api/users/id
// This route is protected, call POST /api/authenticate to get the token
router.get('/:id', jwt, UsersControllers.findById);

// PUT /api/users/id
// This route is protected, call POST /api/authenticate to get the token
router.put('/:id', jwt, UsersControllers.update);

// DELETE /api/users/id
// This route is protected, call POST /api/authenticate to get the token
router.delete('/:id', jwt, UsersControllers.delete);

export default router;
