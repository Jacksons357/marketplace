type UpdateData = {
  name?: string
  description?: string
}

export class Organization {
  public id: string
  public createdAt: Date
  public name: string
  public description: string | null

  constructor(
    id: string,
    name: string,
    description: string | null = null
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.createdAt = new Date()
  }

  update(data: UpdateData) {
    if (data.name) this.name = data.name
    if (data.description !== undefined) this.description = data.description
  }
}
