import { prisma } from "../../../prisma/client"
import { Organization } from "../../domain/entities/Organization"
import { IOrganizationRepository } from "../../domain/repositories/IOrganizationRepository"

export class OrganizationRepository implements IOrganizationRepository {
  async create(org: Organization): Promise<Organization> {
    const record = await prisma.organization.create({
      data: {
        id: org.id,
        name: org.name,
        description: org.description,
      }
    })

    return new Organization(
      record.id,
      record.name,
      record.description,
    )
  }

  async findById(id: string): Promise<Organization | null> {
    const record = await prisma.organization.findUnique({ where: { id } })
    if (!record) return null

    return new Organization(
      record.id,
      record.name,
      record.description,
    )
  }

  async findAll(): Promise<Organization[]> {
    const records = await prisma.organization.findMany()
    return records.map(
      r => new Organization(r.id, r.name, r.description)
    )
  }
}