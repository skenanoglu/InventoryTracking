import { action, observable } from 'mobx';

import CreateCompanyInput from '../services/company/dto/createCompanyInput';
import { EntityDto } from '../services/dto/entityDto';
import { GetAllCompanyOutput } from '../services/company/dto/getAllCompanyOutput';
import CompanyModel from '../models/Companies/CompanyModel';
import type UpdateCompanyInput from '../services/company/dto/updateCompanyInput';
import companyService from '../services/company/companyService';

class CompanyStore {
  @observable companies!: GetAllCompanyOutput [];
  @observable companyModel: CompanyModel = new CompanyModel();

  @action
  async create(createCompanyInput: CreateCompanyInput) {
    await companyService.create(createCompanyInput);
  }

  @action
  async createCompany() {
    this.companyModel = {
      id: 0,
      companyName: '',
      taxNo : 0,
      description: '',
    };
  }

  @action
  async update(updateCompanyInput: UpdateCompanyInput) {
    await companyService.update(updateCompanyInput);
  }

  @action
  async delete(entityDto: EntityDto) {
    await companyService.delete(entityDto);
    this.companies = this.companies.filter(
      (x: GetAllCompanyOutput) => x.id !== entityDto.id
    );
  }

  @action
  async get(entityDto: EntityDto) {
    let result = await companyService.get(entityDto);
    this.companyModel = result;
  }

  @action
  async getAll() {
    let result = await companyService.getAll();
    this.companies = result.items;
  }
}

export default CompanyStore;
