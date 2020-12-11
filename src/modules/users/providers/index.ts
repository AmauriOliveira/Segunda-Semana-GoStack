import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCcryptHashProvider from './HashProvider/implementations/BCcryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCcryptHashProvider);
