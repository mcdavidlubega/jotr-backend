import express from 'express';
import { errors } from 'celebrate';
import error from './middleware/error';
import connect from './database/database';
import routes from './routes';
import asyncMiddleware from './middleware/async';

connect();
const app = express();
app.use(express.json());
app.use(routes);
app.get(
  '/',
  asyncMiddleware(async (req, res) => {
    return res.status(200).send('Home');
  })
);
app.use((req, res) => {
  return res.status(404).json({ message: 'resource not found' });
});
app.use(errors());
app.use(error);
export default app;
