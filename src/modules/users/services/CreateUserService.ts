import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async exceute({ name, email, password }: IRequest): Promise<User> {
    // verefica se ja tem um co o mesmo email
    const checkUserExists = await this.usersRepository.findByEmail(email);
    // caso retornar verdadeito lança um erro
    if (checkUserExists) {
      throw new AppError('Email address already used');
    }
    // criptografa a senha com um hash
    const hashedPassword = await hash(password, 8);
    // cria instancia da User
    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    // retorna o user
    return user;
  }
}

export default CreateUserService;
