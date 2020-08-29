import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    // desestrutura
    const { name, email, password } = request.body;
    // cria um objeto
    const createUserService = new CreateUserService();
    // passa os dado para o metodo do objeto
    const user = await createUserService.exceute({ name, email, password });
    // remove o password da resposta
    delete user.password;
    // retorna o jsom com o objeto
    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
