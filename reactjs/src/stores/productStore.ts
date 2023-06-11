import { action, observable } from 'mobx';

import CreateProductInput from '../services/product/dto/createProductInput';
import { EntityDto } from '../services/dto/entityDto';
import { GetAllProductOutput } from '../services/product/dto/getAllProductOutput';
import ProductModel from '../models/Products/ProductModel';
import type UpdateProductInput from '../services/product/dto/updateProductInput';
import productService from '../services/product/productService';

class ProductStore {
  @observable products!: GetAllProductOutput [];
  @observable productModel: ProductModel = new ProductModel();

  @action
  async create(createProductInput: CreateProductInput) {
    await productService.create(createProductInput);
  }

  @action
  async createProduct() {
    this.productModel = {
      id: 0,
      name: '',
      brand: '',
      capacity: '',
      weight: '',
      description: '',
      totalCount: 0,
      countInDebit : 0,
    };
  }

  @action
  async update(updateProductInput: UpdateProductInput) {
    await productService.update(updateProductInput);
  }

  @action
  async delete(entityDto: EntityDto) {
    await productService.delete(entityDto);
    this.products = this.products.filter(
      (x: GetAllProductOutput) => x.id !== entityDto.id
    );
  }

  @action
  async get(entityDto: EntityDto) {
    let result = await productService.get(entityDto);
    this.productModel = result;
  }

  @action
  async getAll() {
    let result = await productService.getAll();
    this.products = result.items;
  }
}

export default ProductStore;
