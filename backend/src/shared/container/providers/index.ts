import { container } from 'tsyringe';
import IMailProvider from './MailProvider/models/IMailProvider';

container.registerSingleton<IMailProvider>