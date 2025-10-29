import { FastifyInstance } from "fastify";
import { authRoutes } from "./auth/auth";

export function routes(app: FastifyInstance) {
  app.register(authRoutes, { prefix: "/auth" });
}