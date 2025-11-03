import { AppError } from "../../shared/errors/app-error";

export class Product {
  constructor(
    public readonly id: string,
    public readonly organizationId: string,
    public name: string,
    public description: string | null,
    public price: number,
    public category: string,
    public imageUrl: string | null,
    public stockQty: number,
    public weightGrams: number,
    public readonly createdAt?: Date,
    public updatedAt?: Date,
  ) {
    // this.validate()
  }

  // private validate() {
  //   if (!this.name || this.name.trim().length === 0) throw new AppError('Name required', 400);
  //   if (this.price < 0) throw new AppError('Price must be >= 0', 400);
  //   if (this.stockQty < 0) throw new AppError('stockQty must be >= 0', 400);
  // }

  // changeStock(delta: number) {
  //   const newQty = this.stockQty + delta;
  //   if (newQty < 0) throw new AppError('Insufficient stock', 400);
  //   this.stockQty = newQty;
  // }
}