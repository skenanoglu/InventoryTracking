import { action, observable } from 'mobx';

import CreateCorporateDebitInput from '../services/corporateDebit/dto/createCorporateDebitInput';
import { EntityDto } from '../services/dto/entityDto';
import { GetAllCorporateDebitOutput } from '../services/corporateDebit/dto/getAllCorporateDebitOutput';
import type { PagedResultDto } from '../services/dto/pagedResultDto';
import type { PagedCorporateDebitResultRequestDto } from '../services/corporateDebit/dto/PagedCorporateDebitResultRequestDto';
import CorporateDebitModel from '../models/CorporateDebits/CorporateDebitModel';
import type UpdateCorporateDebitInput from '../services/corporateDebit/dto/updateCorporateDebitInput';
import CorporateDebitService from '../services/corporateDebit/corporateDebitService';

class CorporateDebitStore {
  @observable CorporateDebits!: PagedResultDto<GetAllCorporateDebitOutput>;
  @observable CorporateDebitModel: CorporateDebitModel = new CorporateDebitModel();

  @action
  async create(createCorporateDebitInput: CreateCorporateDebitInput) {
    await CorporateDebitService.create(createCorporateDebitInput);
  }

  @action
  async createCorporateDebit() {
    this.CorporateDebitModel = {
      id: 0,
      companyId : 0,
      employeeDepartment: '',
      productId: 0,
      productCount: 0,
    };
  }

  @action
  async update(updateCorporateDebitInput: UpdateCorporateDebitInput) {
    let result = await CorporateDebitService.update(updateCorporateDebitInput);
    return result;
    // this.CorporateDebits.items = this.CorporateDebits.items.map((x: GetAllCorporateDebitOutput) => {
    //   if (x.id === updateCorporateDebitInput.id) x = result;
    //   return x;
    // });
  }

  @action
  async delete(entityDto: EntityDto) {
    await CorporateDebitService.delete(entityDto);
    this.CorporateDebits.items = this.CorporateDebits.items.filter(
      (x: GetAllCorporateDebitOutput) => x.id !== entityDto.id
    );
  }

  @action
  async get(entityDto: EntityDto) {
    let result = await CorporateDebitService.get(entityDto);
    this.CorporateDebitModel = result;
  }

  @action
  async getAll(pagedFilterAndSortedRequest: PagedCorporateDebitResultRequestDto) {
    let result = await CorporateDebitService.getAll(pagedFilterAndSortedRequest);
    this.CorporateDebits = result;
  }
}

export default CorporateDebitStore;
