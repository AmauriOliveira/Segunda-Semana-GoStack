import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

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
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    // verefica se ja tem um co o mesmo email
    const checkUserExists = await this.usersRepository.findByEmail(email);
    // caso retornar verdadeito lança um erro
    if (checkUserExists) {
      throw new AppError('Email address already used');
    }
    // criptografa a senha com um hash
    const hashedPassword = await this.hashProvider.generateHash(password);
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
