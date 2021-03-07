import express from 'express';
import 'reflect-metadata';

//import uploadConfig from '@config/upload';

import routes from './routes';
import AppError from '../../errors/AppError';

import '@shared/infra/typeorm';

const app = express();

//app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('👻 Tô online buuuuuuh 👻');
});