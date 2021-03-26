import IUsersRepository from "../repositories/IUSersRepository";
import { inject } from 'tsyringe';
import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import IUserTokensRepository from "../repositories/IUserTokenRepository";
import { resolve } from 'path';

interface IRequest {
  email: string;
}

export default class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokenRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if(!user) throw new Error('User does not exists');

    const { token } = await this.userTokensRepository.generate(user.id);

    const forgotPasswordTemplate = resolve(__dirname, '..', 'views', 'forgot_password.hbs');

    this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: '[GoBarber] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token}`,
        }
      }
    });
  }

}