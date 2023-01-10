import CreateCorporateDebitInput from './dto/createCorporateDebitInput';
import CreateCorporateDebitOutput from './dto/createCorporateDebitOutput';
import { EntityDto } from '../../services/dto/entityDto';
import { GetAllCorporateDebitOutput } from './dto/getAllCorporateDebitOutput';
import GetCorporateDebitOutput from './dto/getCorporateDebitOutput';
import { PagedResultDto } from '../../services/dto/pagedResultDto';
import { PagedCorporateDebitResultRequestDto } from './dto/PagedCorporateDebitResultRequestDto';
import UpdateCorporateDebitInput from './dto/updateCorporateDebitInput';
import UpdateCorporateDebitOutput from './dto/updateCorporateDebitOutput';
import http from '../httpService';

class CorporateDebitService {
  public async create(
    createCorporateDebitInput: CreateCorporateDebitInput
  ): Promise<CreateCorporateDebitOutput> {
    let result = await http.post(
      'api/services/app/CorporateDebit/Create',
      createCorporateDebitInput
    );
    return result.data.result;
  }

  public async delete(entityDto: EntityDto) {
    let result = await http.delete('api/services/app/CorporateDebit/Delete', { params: entityDto });
    return result.data;
  }

  public async get(entityDto: EntityDto): Promise<GetCorporateDebitOutput> {
    let result = await http.get('api/services/app/CorporateDebit/Get', { params: entityDto });
    return result.data.result;
  }

  public async getAll(
    pagedFilterAndSortedRequest: PagedCorporateDebitResultRequestDto
  ): Promise<PagedResultDto<GetAllCorporateDebitOutput>> {
    let result = await http.get('api/services/app/CorporateDebit/GetAll', {
      params: pagedFilterAndSortedRequest,
    });
    return result.data.result;
  }

  public async update(
    updateCorporateDebitInput: UpdateCorporateDebitInput
  ): Promise<UpdateCorporateDebitOutput> {
    let result = await http.put(
      'api/services/app/CorporateDebit/Update',
      updateCorporateDebitInput
    );
    return result.data.result;
  }
}

export default new CorporateDebitService();
