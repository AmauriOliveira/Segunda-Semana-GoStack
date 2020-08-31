import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
// cria contante que recebe multer e upload config como parametro
const upload = multer(uploadConfig);

// cria user
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
// muda o avatar
// o nome do upload deve ser o mesmo do campo que enviar no formulario
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    // cria o bojeto
    const updateUserAvatarService = new UpdateUserAvatarService();
    // execulta o metodo do objeto
    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });
    // remover o password do retorno
    delete user.password;
    // manda o retorno
    return response.json(user);
  },
);

export default usersRouter;
