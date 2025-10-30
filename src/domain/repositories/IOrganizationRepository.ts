import { Organization } from "../entities/Organization"

export interface IOrganizationRepository {
  create(organization: Organization): Promise<Organization>
  findById(id: string): Promise<Organization | null>
  findAll(): Promise<Organization[]>
}
