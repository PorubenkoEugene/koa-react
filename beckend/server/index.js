import bodyParser from 'koa-bodyparser';
import Koa from 'koa';
import logger from 'koa-logger';
import helmet from 'koa-helmet';
import cors from '@koa/cors';
import routing from './routes';
import { port } from './config';
import {setUpConnection} from "./utils/DataBaseUtils";

setUpConnection()
    .then(message=>console.log(`Connect to DB at port - ${port}`))
    .catch(err=>console.log(err));


// Create Koa Application
const app = new Koa();

app
    .use(bodyParser())
    .use(cors())
    .use(logger())
    .use(bodyParser())
    .use(helmet());

routing(app);

// Start the application
app.listen(port, () =>
  console.log(`✅  The server is running at http://localhost:${port}/`)
);

export default app;
