import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayLoad {
  iat: number; // criado
  exp: number; // valido até
  sub: string; // id do user
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // validar o token JWT
  const authHeader = request.headers.authorization;
  // verefica se existe
  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }
  // quebra a string em um array, sendo a primeira o tipo a segunda o token
  // como não vai usar a primeira parte, deixe vazia e coloque uma virgula
  const [, token] = authHeader.split(' ');
  // verefica se o token é valido
  try {
    // primeiro parametro o token, segundo a chave de segredo
    const decoded = verify(token, authConfig.jwt.secret);
    // a sigla 'as' força um tipo a uma varaivel
    const { sub } = decoded as TokenPayLoad;
    // coloca um id dentro do request
    // ⚠ O user não é padrão, foi feito na src/@types/express.d.ts ⚠
    request.user = { id: sub };
    // permte avançar
    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
