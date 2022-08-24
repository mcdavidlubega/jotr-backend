import 'dotenv/config';
import express from 'express';
import connect from './database/database';

connect();
const app = express();
app.use(express.json());

export default app;
