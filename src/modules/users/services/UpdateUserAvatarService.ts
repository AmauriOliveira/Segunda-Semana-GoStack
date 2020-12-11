import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IStorageProvider from '@shared/container/providers/storageProvider/models/IStorageProvider';
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
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
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
      // apaga o antigo
      await this.storageProvider.deleteFile(user.avatar);
    }
    // salva a foto
    const fileName = await this.storageProvider.saveFile(avatarFileName);
    // coloca o novo nome do arquivo no user
    user.avatar = fileName;
    // vai atualizar o user, caso não tiver ele cria, caso já tiver ele atualiza
    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
