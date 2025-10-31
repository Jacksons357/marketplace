import { FastifyInstance } from "fastify";
import { authRoutes } from "./auth-routes";
import { productRoutes } from "./product-routes";

export function routes(app: FastifyInstance) {
  app.register(authRoutes, { prefix: "/auth" });
  app.register(productRoutes, { prefix: "/products" });
}