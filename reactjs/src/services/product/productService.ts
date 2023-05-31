import CreateProductInput from './dto/createProductInput';
import CreateProductOutput from './dto/createProductOutput';
import { EntityDto } from '../../services/dto/entityDto';
import GetProductOutput from './dto/getProductOutput';
import UpdateProductInput from './dto/updateProductInput';
import UpdateProductOutput from './dto/updateProductOutput';
import http from '../httpService';

class ProductService {
  public async create(createProductInput: CreateProductInput): Promise<CreateProductOutput> {
    let result = await http.post('api/services/app/Product/Create', createProductInput);
    return result.data.result;
  }

  public async delete(entityDto: EntityDto) {
    let result = await http.delete('api/services/app/Product/Delete', { params: entityDto });
    return result.data;
  }

  public async get(entityDto: EntityDto): Promise<GetProductOutput> {
    let result = await http.get('api/services/app/Product/Get', { params: entityDto });
    return result.data.result;
  }

  public async getAll() {
    let result = await http.get('api/services/app/Product/GetAll');
    return result.data.result;
  }

  public async update(updateProductInput: UpdateProductInput): Promise<UpdateProductOutput> {
    let result = await http.put('api/services/app/Product/Update', updateProductInput);
    return result.data.result;
  }
}

export default new ProductService();
