import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { AppError } from "../errors/app-error";

const validateBody = (schema: z.ZodSchema) => async (req: FastifyRequest, res: FastifyReply) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    throw new AppError('Validation data error', 400);
  }

  req.body = result.data;
}

export default validateBody