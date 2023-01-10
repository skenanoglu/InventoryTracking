import { action, observable } from 'mobx';

import CreatePersonelDebitInput from '../services/personelDebit/dto/createPersonelDebitInput';
import { EntityDto } from '../services/dto/entityDto';
import { GetAllPersonelDebitOutput } from '../services/personelDebit/dto/getAllPersonelDebitOutput';
import { PagedResultDto } from '../services/dto/pagedResultDto';
import { PagedPersonelDebitResultRequestDto } from '../services/personelDebit/dto/PagedPersonelDebitResultRequestDto';
import PersonelDebitModel from '../models/PersonelDebits/PersonelDebitModel';
import UpdatePersonelDebitInput from '../services/personelDebit/dto/updatePersonelDebitInput';
import PersonelDebitService from '../services/personelDebit/personelDebitService';

class PersonelDebitStore {
  @observable PersonelDebits!: PagedResultDto<GetAllPersonelDebitOutput>;
  @observable PersonelDebitModel: PersonelDebitModel = new PersonelDebitModel();

  @action
  async create(createPersonelDebitInput: CreatePersonelDebitInput) {
    await PersonelDebitService.create(createPersonelDebitInput);
  }

  @action
  async createPersonelDebit() {
    this.PersonelDebitModel = {
      id: 0,
      name: '',
      surName: '',
      description: '',
      tcno: 0,
      productId: 0,
      productCount: 0,
    };
  }

  @action
  async update(updatePersonelDebitInput: UpdatePersonelDebitInput) {
    let result = await PersonelDebitService.update(updatePersonelDebitInput);
    return result;
    // this.PersonelDebits.items = this.PersonelDebits.items.map((x: GetAllPersonelDebitOutput) => {
    //   if (x.id === updatePersonelDebitInput.id) x = result;
    //   return x;
    // });
  }

  @action
  async delete(entityDto: EntityDto) {
    await PersonelDebitService.delete(entityDto);
    this.PersonelDebits.items = this.PersonelDebits.items.filter(
      (x: GetAllPersonelDebitOutput) => x.id !== entityDto.id
    );
  }

  @action
  async get(entityDto: EntityDto) {
    let result = await PersonelDebitService.get(entityDto);
    this.PersonelDebitModel = result;
  }

  @action
  async getAll(pagedFilterAndSortedRequest: PagedPersonelDebitResultRequestDto) {
    let result = await PersonelDebitService.getAll(pagedFilterAndSortedRequest);
    this.PersonelDebits = result;
  }
}

export default PersonelDebitStore;
