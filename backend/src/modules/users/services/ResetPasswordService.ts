import IUsersRepository from "../repositories/IUSersRepository";
import { inject } from 'tsyringe';
import IUserTokensRepository from "@modules/users/repositories/IUserTokenRepository";

interface IRequest {
  token: string;
  password: string;
}

export default class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokenRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ password, token }: IRequest): Promise<void> {
    const userToken = this.userTokensRepository.findByToken(token);

    if(!userToken) throw new Error('User token does not exist');

    const user = await this.usersRepository.findById(userToken.user_id);

    if(!user) throw new Error('User does not exist');

    user.password = password;

    await this.usersRepository.save(user);
  }

}