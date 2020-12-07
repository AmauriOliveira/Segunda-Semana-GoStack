import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserSession from '@modules/users/services/AuthenticateUserSession';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    // desestrutura
    const { email, password } = request.body;
    // cria um objeto

    const authenticateUserSession = container.resolve(AuthenticateUserSession);
    // passa os dado para o metodo do objeto
    const { user, token } = await authenticateUserSession.execute({
      email,
      password,
    });
    // remove o password da resposta
    delete user.password;
    // retorna o jsom com o objeto
    return response.json({ user, token });
  }
}
