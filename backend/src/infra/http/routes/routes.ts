import { FastifyInstance } from "fastify";
import { authRoutes } from "./auth.routes";
import { adminRoutes } from "./admin.routes";
import { productRoutes } from "./product.routes";
import { orderRoutes } from "./order.routes";
import { logsRoutes } from "./logs.routes";

export function routes(app: FastifyInstance) {
  app.register(authRoutes, { prefix: "/auth" });
  app.register(adminRoutes, { prefix: "/admin" });
  app.register(productRoutes, { prefix: "/products" });
  app.register(orderRoutes, { prefix: "/orders" });
  app.register(logsRoutes, { prefix: "/logs" });
}