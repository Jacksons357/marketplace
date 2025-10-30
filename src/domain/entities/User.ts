
import bcrypt from "bcryptjs";

export class User {
  public id: string;
  public createdAt: Date;

  constructor(
    id: string,
    public name: string,
    public email: string,
    public phone: string | null,
    private passwordHash: string,
  ) {
    this.id = id
    this.createdAt = new Date()
  }

  public getPasswordHash(){
    return this.passwordHash
  }

  public sanitize() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      createdAt: this.createdAt,
    }
  }

  public toJSON() {
    return this.sanitize();
  }
}