class ProductModel {
  id!: number;
  name!: string;
  brand!: string;
  capacity!: string;
  weight!: string;
  description!: string;
  count!: number;
}

export default ProductModel;

/**
 * Bu model forontend ile backend arasında haberleşme sırasında verilerin tutulacağı dto'dur.
 * Api ile json tipinde aktarım yapıldığı için küçük harfle baslatıldı.
 */
