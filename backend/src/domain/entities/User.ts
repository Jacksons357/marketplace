import bcrypt from "bcryptjs";

export type UserRole = "USER" | "ADMIN";

export class User {
  public id: string;
  public createdAt: Date;

  constructor(
    id: string,
    public name: string,
    public email: string,
    public phone: string | null,
    private passwordHash: string,
    public role: UserRole,
    public organizationId?: string | null,
  ) {
    this.id = id;
    this.createdAt = new Date();
  }

  public async checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.passwordHash);
  }

  public getPasswordHash() {
    return this.passwordHash;
  }

  public sanitize() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      role: this.role,
      organizationId: this.organizationId,
      createdAt: this.createdAt,
    };
  }

  public toJSON() {
    return this.sanitize();
  }
}
