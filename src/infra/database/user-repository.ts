import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { prisma } from "./prisma/client";

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
      }
    })
    return new User(
      record.id,
      record.name,
      record.email,
      record.phone,
      record.passwordHash,
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
    )
  }
}