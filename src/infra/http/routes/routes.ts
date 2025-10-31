import { FastifyInstance } from "fastify";
import { authRoutes } from "./auth-routes";
import { adminRoutes } from "./admin-routes";
import { productRoutes } from "./product-routes";

export function routes(app: FastifyInstance) {
  app.register(authRoutes, { prefix: "/auth" });
  app.register(adminRoutes, { prefix: "/admin" });
  app.register(productRoutes, { prefix: "/products" });
}