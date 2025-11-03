import { FastifyRequest, FastifyReply } from "fastify";
import jwt, { JwtPayload } from "jsonwebtoken";

interface JWTPayload extends JwtPayload {
  sub: string
  role: 'USER' | 'ADMIN'
  name: string
  phone?: string
  iat: number
  exp: number
}

export async function authMiddleware(req: FastifyRequest, res: FastifyReply) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) throw new Error("Missing Authorization header");

    const token = authHeader.split(" ")[1];
    if (!token) throw new Error("Missing token");

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
    req.user = payload;
  } catch {
    return res.status(401).send({ message: "Unauthorized" });
  }
}

export function requireUser(req: FastifyRequest, res: FastifyReply, next: () => void) {
  if (req.user?.role !== "USER") {
    return res.status(403).send({ message: "Forbidden: Users only" });
  }
  next();
}

export function requireAdmin(req: FastifyRequest, res: FastifyReply, next: () => void) {
  if (req.user?.role !== "ADMIN") {
    return res.status(403).send({ message: "Forbidden: Admins only" });
  }
  next();
}