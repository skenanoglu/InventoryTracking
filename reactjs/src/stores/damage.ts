import { action, observable } from 'mobx';

import CreateDamageInput from '../services/damage/dto/createDamageInput';
import { EntityDto } from '../services/dto/entityDto';
import { GetAllDamageOutput } from '../services/damage/dto/getAllDamageOutput';
import type { PagedResultDto } from '../services/dto/pagedResultDto';
import type { PagedDamageResultRequestDto } from '../services/damage/dto/PagedDamageResultRequestDto';
import type UpdateDamageInput from '../services/damage/dto/updateDamageInput';
import DamageModel from '../models/Products/DamageModel';
import damageService from '../services/damage/damageService';

class DamageStore {
  @observable damages!: PagedResultDto<GetAllDamageOutput>;
  @observable damageModel: DamageModel = new DamageModel();

  @action
  async create(createDamageInput: CreateDamageInput) {
    await damageService.create(createDamageInput);
  }

  @action
  async createDamage() {
    this.damageModel = {
      id : 0,
      productId: 0,
      userId: 0,
      companyId: 0,
      damageDescription: "",
      count: 0,
      repairCost: 0,
      repairDate: "",
      repairDescription: "",
      isRepaired: false,
      companyOrUser : 0
    };
  }

  @action
  async update(updateDamageInput: UpdateDamageInput) {
    let result = await damageService.update(updateDamageInput);

    this.damages.items = this.damages.items.map((x: GetAllDamageOutput) => {
      if (x.id === updateDamageInput.id) x = result;
      return x;
    });
  }

  @action
  async delete(entityDto: EntityDto) {
    await damageService.delete(entityDto);
    this.damages.items = this.damages.items.filter((x: GetAllDamageOutput) => x.id !== entityDto.id);
  }

  @action
  async get(entityDto: EntityDto) {
    let result = await damageService.get(entityDto);
    this.damageModel = result;
  }

  @action
  async getAll(pagedFilterAndSortedRequest: PagedDamageResultRequestDto) {
    let result = await damageService.getAll(pagedFilterAndSortedRequest);
    this.damages = result;
  }
}

export default DamageStore;
