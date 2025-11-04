import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import Fastify from "fastify";
import { routes } from "./infra/http/routes/routes";
import { errorHandler } from "./shared/errors/error-handler";
import fastifyLoggingPlugin from "./infra/fastify/fastify-logging-plugin";
import { makeLogsService } from "./infra/factories/make-logs";
import cors from "@fastify/cors";

export const app = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        levelFirst: true,
      },
    },
  },
})

app.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
})

app.register(swagger, {
  openapi: {
    info: {
      title: 'Marketplace API',
      description: 'API documentation for Marketplace Multi-ONG',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3333',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
});

app.register(swaggerUI, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'none',
    deepLinking: true,
  },
  staticCSP: true,
  transformSpecificationClone: true,
});

app.register(routes)
app.setErrorHandler(errorHandler)
app.register(fastifyLoggingPlugin, {
  logsService: makeLogsService(),
})