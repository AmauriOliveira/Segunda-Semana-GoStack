import path from 'path';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    // procura um usro pelo Id
    const user = await this.usersRepository.findById(user_id);
    // verefica se não foi encontrado
    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }
    // caso foi econtrado e tenha avatar
    if (user.avatar) {
      // junta dois caminho
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      // stat traz a status de um arquivo, apenas se ele existir
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      // verefica se o arquivo existe
      if (userAvatarFileExists) {
        // apaga o avatar antigo
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFileName;
    // vai atualizar o user, caso não tiver ele cria, caso já tiver ele atualiza
    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
