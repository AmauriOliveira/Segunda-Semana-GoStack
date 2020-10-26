import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface RequestDTO {
  email: string;
  password: string;
}

interface ResponseDTO {
  user: User;
  token: string;
}

class AuthenticateUserSession {
  public async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } }); // equivale a {email: email}

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }
    // desitrutura o authConfig
    const { expiresIn, secret } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn, // equivale a  'expiresIn : expiresIn'
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserSession;
