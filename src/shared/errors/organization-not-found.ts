import { AppError } from "./app-error";

export class OrganizationNotFoundError extends AppError {
  constructor() {
    super("User does not belong to any organization", 404)
  }
}