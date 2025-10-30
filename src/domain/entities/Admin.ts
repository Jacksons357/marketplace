export type UserRole = "ADMIN"

export class Admin {
  public id: string;
  public createdAt: Date;
  public organizationId: string | null;
  public role: UserRole

  constructor(
    id: string,
    public name: string,
    public email: string,
    public phone: string | null,
    private passwordHash: string,
    organizationId: string | null,
    role: UserRole = "ADMIN"
  ) {
    this.id = id
    this.organizationId = organizationId
    this.role = role
    this.createdAt = new Date()
  }

  public checkPassword(password: string){
    return password === this.passwordHash
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
      organizationId: this.organizationId,
      role: this.role,
      createdAt: this.createdAt,
    }
  }

  public toJSON() {
    return this.sanitize();
  }
}