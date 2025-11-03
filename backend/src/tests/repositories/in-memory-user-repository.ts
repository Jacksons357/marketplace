import { User } from "../../domain/entities/User"
import { IUserRepository } from "../../domain/repositories/IUserRepository"

export class InMemoryUserRepository implements IUserRepository {
  private users: User[] = []

  async create(user: User): Promise<User> {
    this.users.push(user)
    return user
  }

  async findByPhone(phone: string): Promise<User | null> {
    return this.users.find(u => u.phone === phone) || null
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find(u => u.id === id) || null
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(u => u.email === email) || null
  }

  async findMany(): Promise<User[]> {
    return this.users
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    const user = await this.findById(id)
    if (!user) return null
    Object.assign(user, data)
    return user
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter(u => u.id !== id)
  }

  clear() {
    this.users = []
  }
}
