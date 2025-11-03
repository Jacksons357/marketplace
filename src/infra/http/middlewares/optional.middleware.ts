import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";

export async function optionalAuth(req: FastifyRequest, res: FastifyReply) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    req.user = null;
    return;
  }

  try {
    const token = authHeader.split(" ")[1];
    if (!token) {
      req.user = null;
      return;
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as any;
    req.user = payload;
  } catch (err) {
    req.user = null;
  }
}
