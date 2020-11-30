import { EntityRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository
  extends Repository<Appointment>
  implements IAppointmentsRepository {
  /**
   * findByDate: recebe uma data e pesquisa se tem algum appointment, caso sim retorna ele, caso não retorna null
   */
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.findOne({
      where: { date }, // equivale a data(coluna da tabela):date(parametro)
    });

    return findAppointment;
  }
}

export default AppointmentsRepository;
