import { container } from 'tsyringe';

import IStorageProvider from './storageProvider/models/IStorageProvider';
import DiscStorageProvider from './storageProvider/implementations/DiscStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiscStorageProvider,
);
