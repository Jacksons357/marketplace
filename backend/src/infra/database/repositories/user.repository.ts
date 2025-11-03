import { prisma } from "../prisma/client";
import { User } from "../../../domain/entities/User";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";

export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const record = await prisma.user.findUnique({
      where: {
        email,
      }
    })
    if(!record){
      return null
    }

    return new User(
      record.id,
      record.name,
      record.email,
      record.phone,
      record.passwordHash,
      record.role,
      record.organizationId,
    )
  }

  async findByPhone(phone: string): Promise<User | null> {
    const record = await prisma.user.findUnique({
      where: {
        phone,
      }
    })
    if(!record){
      return null
    }
    return new User(
      record.id,
      record.name,
      record.email,
      record.phone,
      record.passwordHash,
      record.role,
      record.organizationId,
    )
  }

  async create(user: User): Promise<User> {
    const record = await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        passwordHash: user.getPasswordHash(),
        role: user.role,
        organizationId: user.organizationId,
      }
    })
    return new User(
      record.id,
      record.name,
      record.email,
      record.phone,
      record.passwordHash,
      record.role,
      record.organizationId,
    )
  }

  async findById(id: string): Promise<User | null> {
    const record = await prisma.user.findUnique({
      where: {
        id,
      }
    })
    if(!record){
      return null
    }
    return new User(
      record.id,
      record.name,
      record.email,
      record.phone,
      record.passwordHash,
      record.role,
      record.organizationId,
    )
  }
}