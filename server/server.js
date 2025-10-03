import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { connectionToDb } from './database/db.js';
const app = express();
import noteRouter from './routes/crud-routes.js';
import cors from 'cors';

//connection to mongoDb database
connectionToDb();

app.use(
  cors({
    origin: ['http://localhost:5173',
            'http://13.62.46.194:5173'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }),
);

app.use(express.json());

app.use('/api/notes', noteRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is live on ${PORT}`);
});
