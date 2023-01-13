class PersonelDebitModel {
  id!: number;
  name!: string;
  surName!: string;
  description!: string;
  tcno!: number;
  productId!: number;
  productCount!: number;
}

export default PersonelDebitModel;

/**
 * Bu model forontend ile backend arasında haberleşme sırasında verilerin tutulacağı dto'dur.
 * Api ile json tipinde aktarım yapıldığı için küçük harfle baslatıldı.
 */
