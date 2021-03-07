import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUSersRepository';
import { getRepository, Repository } from 'typeorm'
import User from '../entities/User';



class UsersRepository implements IUsersRepository {
  constructor() {
    this.ormRepository = getRepository(User);
  }

  private ormRepository: Repository<User>;

  private async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  private async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });
  }

  public async create(userData: ICreateUserDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create(userData);

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;