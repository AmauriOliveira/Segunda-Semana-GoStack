import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';

interface RequestDTO {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: RequestDTO): Promise<User> {
    // cria um objeto
    const usersRepository = getRepository(User);
    // procura um usro pelo Id
    const user = await usersRepository.findOne(user_id);
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
    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
