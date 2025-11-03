import { AppError } from "./app-error";

export class OrganizationNotFoundError extends AppError {
  constructor() {
    super("Organization not found", 404)
  }
}