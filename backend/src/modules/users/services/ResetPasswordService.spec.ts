
import SendForgotPasswordEmail from './SendForgotPasswordEmailService'
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository'
import FakeEmailProvider from '@shared/container/providers/mailProvider/fakes/FakeMailProvider'
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository'

let fakeUserRepository: FakeUserRepository;
let fakeEmailProvider: FakeEmailProvider;
let falkeHashProvider: FakeUserTokensRepository;
let resetPassword: ResetPassword;

describe('ResetPassword', () => {

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    fakeEmailProvider = new FakeEmailProvider()
    fakeHashProvider = new FakeUserTokensRepository

    resetPassword = new SendForgotPasswordEmail(
      fakeUserRepository,
      fakeEmailProvider,
      fakeUserTokensRepository
    )
  })

  it('should be able to reset the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'aaa',
      email: 'aaa@aaa.com',
      password: '123456'
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);
    await resetPassword.execute({
      password: '123123',
      token: token,
    })

    const updatedUser = await fakeUserRepository.findById(user.id);

    expect(updatedUser?.password).toBe('123123');
  });


})