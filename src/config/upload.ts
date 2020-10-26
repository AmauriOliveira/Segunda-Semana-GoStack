import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp'); // equivale a '../../tmp

export default {
  directory: tmpFolder,

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      // cria um hash usando o crypto 'nativo do node' e converte para hex
      const fileHash = crypto.randomBytes(10).toString('hex');
      // cria um nome juntando a hash e o nome orinal do arquivo
      const fileName = `${fileHash}-${file.originalname}`;
      // retorna um callback, primero parametro caso acontecer erro, segundo é o nome gerado
      return callback(null, fileName);
    },
  }),
};
