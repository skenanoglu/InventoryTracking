class ProductModel {
  id!: number;
  companyName!: string;
  taxNo!: number;
  description!: string;
}

export default ProductModel;

/**
 * Bu model forontend ile backend arasında haberleşme sırasında verilerin tutulacağı dto'dur.
 * Api ile json tipinde aktarım yapıldığı için küçük harfle baslatıldı.
 */
