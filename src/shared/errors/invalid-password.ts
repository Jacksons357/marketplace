import { AppError } from "./app-error";

export class InvalidPasswordError extends AppError {
  constructor() {
    super("Invalid password", 409)
  }
}