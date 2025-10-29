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

  public checkPassword(password: string){
    return password === this.passwordHash
  }

  public getPasswordHash(){
    return this.passwordHash
  }

  public sanitize() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      name: this.name,
      email: this.email,
      phone: this.phone,
    };
  }

  public toJSON() {
    return this.sanitize();
  }
}