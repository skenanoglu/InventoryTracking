import CreateDamageInput from './dto/createDamageInput';
import CreateDamageOutput from './dto/createDamageOutput';
import { EntityDto } from '../../services/dto/entityDto';
import { GetAllDamageOutput } from './dto/getAllDamageOutput';
import GetDamageOutput from './dto/getDamageOutput';
import { PagedResultDto } from '../../services/dto/pagedResultDto';
import {PagedDamageResultRequestDto} from './dto/PagedDamageResultRequestDto';
import UpdateDamageInput from './dto/updateDamageInput';
import UpdateDamageOutput from './dto/updateDamageOutput';
import http from '../httpService';

class DamageService {
  public async create(createDamageInput: CreateDamageInput): Promise<CreateDamageOutput> {
    let result = await http.post('api/services/app/Damage/Create', createDamageInput);
    return result.data.result;
  }

  public async delete(entityDto: EntityDto) {
    let result = await http.delete('api/services/app/Damage/Delete', { params: entityDto });
    return result.data;
  }

  public async get(entityDto: EntityDto): Promise<GetDamageOutput> {
    let result = await http.get('api/services/app/Damage/Get', { params: entityDto });
    return result.data.result;
  }

  public async getAll(pagedFilterAndSortedRequest: PagedDamageResultRequestDto): Promise<PagedResultDto<GetAllDamageOutput>> {
    let result = await http.get('api/services/app/Damage/GetAll', { params: pagedFilterAndSortedRequest });
    return result.data.result;
  }

  public async update(updateDamageInput: UpdateDamageInput): Promise<UpdateDamageOutput> {
    let result = await http.put('api/services/app/Damage/Update', updateDamageInput);
    return result.data.result;
  }
}

export default new DamageService();
