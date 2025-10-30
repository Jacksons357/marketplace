export const registerUserBodySchemaDocs = {
  type: 'object',
  required: ['name', 'email', 'phone', 'password'],
  properties: {
    name:{ type: 'string' },
    email: { type: 'string' },
    phone: { type: 'string' },
    password: { type: 'string' },
  }
}

export const registerUserResponseSchemaDocs = {
  201: {
    description: 'User Created',
    type: 'object',
    properties: {
      user: {
        type: 'object',
        properties: {
          id: { type: 'string', },
          name: { type: 'string' },
          email: { type: 'string' },
          phone: { type: 'string' },
          createdAt: { type: 'string' },
        }
      },
      access_token: { type: 'string' },
    }
  },
  400: {
    description: 'Bad Request',
    type: 'object',
    properties: {
      error: { type: 'string' },
      message: { type: 'string' },
    }
  },
  409: {
    description: 'Conflict',
    type: 'object',
    properties: {
      error: { type: 'string' },
      message: { type: 'string' },
    }
  }
}

export const loginUserBodySchemaDocs = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
  }
}