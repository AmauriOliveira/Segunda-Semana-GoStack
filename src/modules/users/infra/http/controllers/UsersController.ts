import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    // desestrutura
    const { name, email, password } = request.body;

    // cria um objeto
    const createUserService = container.resolve(CreateUserService);
    // passa os dado para o metodo do objeto
    const user = await createUserService.exceute({ name, email, password });
    // remove o password da resposta
    delete user.password;
    // retorna o jsom com o objeto
    return response.json(user);
  }
}
