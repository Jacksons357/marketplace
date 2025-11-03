import 'fastify'
import { JWTPayload } from '../infra/http/middlewares/auth.middleware'

declare module 'fastify' {
  interface FastifyRequest {
    user?: JWTPayload
  }
}
