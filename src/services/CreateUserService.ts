import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';
import AppError from '../errors/AppError';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async exceute({ name, email, password }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User);
    // verefica se ja tem um co o mesmo email
    const checkUserExists = await usersRepository.findOne({
      where: { email }, // equivale a email: email
    });
    // caso retornar verdadeito lança um erro
    if (checkUserExists) {
      throw new AppError('Email address already used');
    }
    // criptografa a senha com um hash
    const hashedPassword = await hash(password, 8);
    // cria instancia da User
    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    // salva no banco a instancia
    await usersRepository.save(user);
    // retorna o user
    return user;
  }
}

export default CreateUserService;
