class CorporateDebitModel {
  id!: number;
  employeeDepartment!: string;
  companyId!: number;
  productId!: number;
  productCount!: number;
}

export default CorporateDebitModel;

/**
 * Bu model forontend ile backend arasında haberleşme sırasında verilerin tutulacağı dto'dur.
 * Api ile json tipinde aktarım yapıldığı için küçük harfle baslatıldı.
 */
