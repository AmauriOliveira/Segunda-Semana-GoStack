import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  /**
   * all : retorna todos repositorios;
   */
  public all(): Appointment[] {
    return this.appointments;
  }

  /**
   * findByDate: recebe uma data e pesquisa se tem algum appointment, caso sim retorna ele, caso não retorna null
   */
  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );
    return findAppointment || null;
  }

  /**
   * create: recebe objeto que contem  {provider: string, date: Date} e retorna um Appointment
   */
  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
