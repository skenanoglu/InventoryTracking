import { action, observable } from 'mobx';

import CreateProductInput from '../services/product/dto/createProductInput';
import { EntityDto } from '../services/dto/entityDto';
import { GetAllProductOutput } from '../services/product/dto/getAllProductOutput';
import { PagedResultDto } from '../services/dto/pagedResultDto';
import { PagedProductResultRequestDto } from '../services/product/dto/PagedProductResultRequestDto';
import ProductModel from '../models/Products/ProductModel';
import UpdateProductInput from '../services/product/dto/updateProductInput';
import productService from '../services/product/productService';

class ProductStore {
  @observable products!: PagedResultDto<GetAllProductOutput>;
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
      count: 0,
    };
  }

  @action
  async update(updateProductInput: UpdateProductInput) {
    let result = await productService.update(updateProductInput);

    this.products.items = this.products.items.map((x: GetAllProductOutput) => {
      if (x.id === updateProductInput.id) x = result;
      return x;
    });
  }

  @action
  async delete(entityDto: EntityDto) {
    await productService.delete(entityDto);
    this.products.items = this.products.items.filter(
      (x: GetAllProductOutput) => x.id !== entityDto.id
    );
  }

  @action
  async get(entityDto: EntityDto) {
    let result = await productService.get(entityDto);
    this.productModel = result;
  }

  @action
  async getAll(pagedFilterAndSortedRequest: PagedProductResultRequestDto) {
    let result = await productService.getAll(pagedFilterAndSortedRequest);
    this.products = result;
  }
}

export default ProductStore;
