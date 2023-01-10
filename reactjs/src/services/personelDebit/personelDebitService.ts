import CreatePersonelDebitInput from './dto/createPersonelDebitInput';
import CreatePersonelDebitOutput from './dto/createPersonelDebitOutput';
import { EntityDto } from '../../services/dto/entityDto';
import { GetAllPersonelDebitOutput } from './dto/getAllPersonelDebitOutput';
import GetPersonelDebitOutput from './dto/getPersonelDebitOutput';
import { PagedResultDto } from '../../services/dto/pagedResultDto';
import { PagedPersonelDebitResultRequestDto } from './dto/PagedPersonelDebitResultRequestDto';
import UpdatePersonelDebitInput from './dto/updatePersonelDebitInput';
import UpdatePersonelDebitOutput from './dto/updatePersonelDebitOutput';
import http from '../httpService';

class PersonelDebitService {
  public async create(
    createPersonelDebitInput: CreatePersonelDebitInput
  ): Promise<CreatePersonelDebitOutput> {
    let result = await http.post('api/services/app/PersonalDebit/Create', createPersonelDebitInput);
    return result.data.result;
  }

  public async delete(entityDto: EntityDto) {
    let result = await http.delete('api/services/app/PersonalDebit/Delete', { params: entityDto });
    return result.data;
  }

  public async get(entityDto: EntityDto): Promise<GetPersonelDebitOutput> {
    let result = await http.get('api/services/app/PersonalDebit/Get', { params: entityDto });
    return result.data.result;
  }

  public async getAll(
    pagedFilterAndSortedRequest: PagedPersonelDebitResultRequestDto
  ): Promise<PagedResultDto<GetAllPersonelDebitOutput>> {
    let result = await http.get('api/services/app/PersonalDebit/GetAll', {
      params: pagedFilterAndSortedRequest,
    });
    return result.data.result;
  }

  public async update(
    updatePersonelDebitInput: UpdatePersonelDebitInput
  ): Promise<UpdatePersonelDebitOutput> {
    let result = await http.put('api/services/app/PersonalDebit/Update', updatePersonelDebitInput);
    return result.data.result;
  }
}

export default new PersonelDebitService();
