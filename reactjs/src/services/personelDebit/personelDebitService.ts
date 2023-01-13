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
  /**
   * Kişisel verilmiş zimmetlerin crud işlemlerini barındırır.
   * backendden gelen create update delete update metodlarını frontendde karşılar ve
   * tüm proje içerisinde tek bir yerden çağırılmasını sağlar
   */
  public async create(
    createPersonelDebitInput: CreatePersonelDebitInput //update ederken createdto'ya sadık kalması için tip belirtilit
  ): Promise<CreatePersonelDebitOutput> {
    let result = await http.post('api/services/app/PersonalDebit/Create', createPersonelDebitInput);
    /**
     * Backend'de http içerisinde belirtilen api ya istek atılır. içerisine de metoda gönderilen json verilir.
     */
    return result.data.result; //respons ta işimize yarayan veri data --result altında olduğundan boyle döndürüldü.
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

export default new PersonelDebitService(); // Başka classlardan bu isimle erişebilmek için.
