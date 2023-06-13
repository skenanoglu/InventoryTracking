export default class CreateDamageInput {
  productId!: number;
  userId!: number;
  companyId!: number;
  damageDescription!: string;
  count!: number;
  repairCost!: number;
  repairDate!: string;
  repairDescription!: string;
  isRepaired!: boolean;
  companyOrUser!: number;
}
