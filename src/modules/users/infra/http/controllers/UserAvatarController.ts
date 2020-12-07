import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    // cria o bojeto
    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);
    // execulta o metodo do objeto
    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });
    // remover o password do retorno
    delete user.password;
    // manda o retorno
    return response.json(user);
  }
}
