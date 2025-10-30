import { FastifyError, FastifyReply, FastifyRequest } from "fastify"
import { AppError } from "./app-error"

export function errorHandler(
  error: FastifyError | AppError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (error instanceof AppError) {
    return reply.status(error.code).send({
      error: error.name,
      message: error.message,
    })
  }

  console.error(error)

  return reply.status(500).send({
    error: "InternalServerError",
    message: "Ocorreu um erro inesperado.",
  })
}