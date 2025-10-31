import { FastifyInstance } from "fastify";
import { authRoutes } from "./auth-routes";
import { adminRoutes } from "./admin-routes";

export function routes(app: FastifyInstance) {
  app.register(authRoutes, { prefix: "/auth" });
  app.register(adminRoutes, { prefix: "/admin" });
}