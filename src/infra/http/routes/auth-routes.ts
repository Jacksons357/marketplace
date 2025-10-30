import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { registerAdminSchema } from "../../../application/dtos/RegisterAdminDTO";
import { registerUserSchema } from "../../../application/dtos/RegisterUserDTO";
import validateBody from "../middlewares/validate-body";
import { 
  loginUserBodySchemaDocs,
  registerAdminBodySchemaDocs, 
  registerAdminResponseSchemaDocs, 
  registerUserBodySchemaDocs, 
  registerUserResponseSchemaDocs 
} from "../../../presentation/docs/swagger";
import { loginUserSchema } from "../../../application/dtos/LoginUserDTO";
import { makeUserController } from "../../factories/make-register-user";
import { makeAdminController } from "../../factories/make-register-admin";
import { authMiddleware, requireUser } from "../middlewares/auth.middleware";
import { makeAuthController } from "../../factories/make-auth";

export function authRoutes(app: FastifyInstance) {
  const userController = makeUserController()
  const adminController = makeAdminController()
  const authController = makeAuthController()

  app.post("/admin/register", {
    schema: {
      tags: ['Auth'],
      summary: 'Register a new admin',
      description: 'Register a new admin with organization in the system and sign in with access token',
      body: registerAdminBodySchemaDocs,
      response: registerAdminResponseSchemaDocs,
    },
    preHandler: [
      validateBody(registerAdminSchema) 
    ]
  }, async (req: FastifyRequest, res: FastifyReply) => adminController.register(req, res));

  app.post('/user/register', {
    schema: {
      tags: ['Auth'],
      summary: 'Register a new user',
      description: 'Register a new user in the system and sign in with access token',
      body: registerUserBodySchemaDocs,
      response: registerUserResponseSchemaDocs,
    },
    preHandler: [
      validateBody(registerUserSchema)
    ]
  }, async (req: FastifyRequest, res: FastifyReply) => userController.register(req, res));

  app.post('/user/login', {
    schema: {
      tags: ['Auth'],
      summary: 'Login a user',
      description: 'Login a user in the system and sign in with access token',
      body: loginUserBodySchemaDocs,
      response: registerUserResponseSchemaDocs,
    },
    preHandler: [
      validateBody(loginUserSchema)
    ]
  }, async (req: FastifyRequest, res: FastifyReply) => authController.login(req, res))

  app.get('/me', {
    preHandler: [
      authMiddleware,
    ]
  }, async (req: FastifyRequest, res: FastifyReply) => authController.me(req, res))
}