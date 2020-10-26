/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
// derve para  o express suportar  erros async
import 'express-async-errors';

import routes from './routes';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

import './database';

const app = express();

app.use(cors());
app.use(express.json());
// rota de upload de avatar
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
// tratamento dos erros
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  // trata os erro gerado pelas rotas que são instancias da class AppError
  if (err instanceof AppError) {
    response.status(err.statusCode).json({
      status: 'error',
      massege: err.message,
    });
  }
  // cria um log para o backend
  console.error(err);
  // erro desconhecido
  return response.status(500).json({
    status: 'error',
    massege: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('🚀🚀🚀🚀');
  console.log('Server Started');
  console.log('🚀🚀🚀🚀');
});
