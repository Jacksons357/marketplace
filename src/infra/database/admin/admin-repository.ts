import { prisma } from "../../../../prisma/client";
import { Admin } from "../../../domain/entities/Admin";
import { IAdminRepository } from "../../../domain/repositories/IAdminRepository";

export class AdminRepository implements IAdminRepository {
  async findByEmail(email: string): Promise<Admin | null> {
    const record = await prisma.user.findUnique({
      where: {
        email,
      }
    })
    if(!record){
      return null
    }

    return new Admin(
      record.id,
      record.name,
      record.email,
      record.phone,
      record.passwordHash,
      record.organizationId,
      record.role
    )
  }

  async findByPhone(phone: string): Promise<Admin | null> {
    const record = await prisma.user.findUnique({
      where: {
        phone,
      }
    })
    if(!record){
      return null
    }
    return new Admin(
      record.id,
      record.name,
      record.email,
      record.phone,
      record.passwordHash,
      record.organizationId,
      record.role
    )
  }

  async create(user: Admin): Promise<Admin> {
    const record = await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        passwordHash: user.getPasswordHash(),
        organizationId: user.organizationId,
        role: user.role,
      }
    })
    return new Admin(
      record.id,
      record.name,
      record.email,
      record.phone,
      record.passwordHash,
      record.organizationId,
      record.role
    )
  }

  async findById(id: string): Promise<Admin | null> {
    const record = await prisma.user.findUnique({
      where: {
        id,
      }
    })
    if(!record){
      return null
    }
    return new Admin(
      record.id,
      record.name,
      record.email,
      record.phone,
      record.passwordHash,
      record.organizationId,
      record.role
    )
  }
}