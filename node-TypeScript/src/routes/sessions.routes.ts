import { Router } from 'express';

import AuthenticateUserSession from '../services/AuthenticateUserSession';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    // desestrutura
    const { email, password } = request.body;
    // cria um objeto
    const authenticateUserSession = new AuthenticateUserSession();
    // passa os dado para o metodo do objeto
    const { user, token } = await authenticateUserSession.execute({
      email,
      password,
    });
    // remove o password da resposta
    delete user.password;
    // retorna o jsom com o objeto
    return response.json({ user, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
