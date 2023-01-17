class CorporateDebitModel {
  id!: number;
  employeeId!: number;
  employeeDepartment!: string;
  employeeName!: string;
  productId!: number;
  productCount!: number;
}

export default CorporateDebitModel;

/**
 * Bu model forontend ile backend arasında haberleşme sırasında verilerin tutulacağı dto'dur.
 * Api ile json tipinde aktarım yapıldığı için küçük harfle baslatıldı.
 */
