import { AppError } from "./app-error";

export class ProductNotFoundError extends AppError {
  constructor() {
    super("Product not found", 404)
  }
}