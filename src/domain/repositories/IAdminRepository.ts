import { Admin } from "../entities/Admin"

export interface IAdminRepository {
  findByEmail(email: string): Promise<Admin | null>
  findByPhone(phone: string): Promise<Admin | null>
  create(admin: Admin): Promise<Admin>
  findById(id: string): Promise<Admin | null>
}
