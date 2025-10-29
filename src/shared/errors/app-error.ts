export class AppError extends Error {
  public readonly code: number
  public readonly name: string

  constructor(message: string, code = 400) {
    super(message)
    this.code = code
    this.name = this.constructor.name

    Error.captureStackTrace?.(this, this.constructor)
  }
}
