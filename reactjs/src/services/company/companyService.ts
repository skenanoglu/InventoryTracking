import CreateCompanyInput from './dto/createCompanyInput';
import CreateCompanyOutput from './dto/createCompanyOutput';
import { EntityDto } from '../../services/dto/entityDto';
import GetCompanyOutput from './dto/getCompanyOutput';
import UpdateCompanyInput from './dto/updateCompanyInput';
import UpdateCompanyOutput from './dto/updateCompanyOutput';
import http from '../httpService';

class CompanyService {
  public async create(createCompanyInput: CreateCompanyInput): Promise<CreateCompanyOutput> {
    let result = await http.post('api/services/app/Company/Create', createCompanyInput);
    return result.data.result;
  }

  public async delete(entityDto: EntityDto) {
    let result = await http.delete('api/services/app/Company/Delete', { params: entityDto });
    return result.data;
  }

  public async get(entityDto: EntityDto): Promise<GetCompanyOutput> {
    let result = await http.get('api/services/app/Company/Get', { params: entityDto });
    return result.data.result;
  }

  public async getAll() {
    let result = await http.get('api/services/app/Company/GetAll');
    return result.data.result;
  }

  public async update(updateCompanyInput: UpdateCompanyInput): Promise<UpdateCompanyOutput> {
    let result = await http.put('api/services/app/Company/Update', updateCompanyInput);
    return result.data.result;
  }
}

export default new CompanyService();
