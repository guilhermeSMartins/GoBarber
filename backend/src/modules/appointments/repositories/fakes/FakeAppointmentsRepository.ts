import Appointment from '../../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../../../appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '../../../appointments/dtos/ICreateAppointmentDTO';
import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment => isEqual(appointment.date, date));

    return findAppointment || undefined;
  }

  public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id });

    // appointment.date = date;
    // appointment.provider_id = provider_id;
    // appointment.id = uuid();

    this.appointments.push(appointment);

    return appointment;
  }
}

export default FakeAppointmentsRepository;