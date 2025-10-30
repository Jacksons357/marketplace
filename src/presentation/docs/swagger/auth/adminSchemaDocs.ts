export const registerAdminBodySchemaDocs = {
  type: 'object',
  required: ['name', 'email', 'phone', 'password', 'organizationName', 'organizationDescription'],
  properties: {
    name:{ type: 'string' },
    email: { type: 'string' },
    phone: { type: 'string' },
    password: { type: 'string' },
    organizationName: { type: 'string' },
    organizationDescription: { type: 'string' }
  }
}

export const registerAdminResponseSchemaDocs = {
  201: {
    description: 'Admin Created',
    type: 'object',
    properties: {
      admin: {
        type: 'object',
        properties: {
          id: { type: 'string', },
          name: { type: 'string' },
          email: { type: 'string' },
          phone: { type: 'string' },
          organizationId: { type: 'string' },
          role: { type: 'string' },
          createdAt: { type: 'string' },
        }
      },
      access_token: { 
        type: 'string' 
      },
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