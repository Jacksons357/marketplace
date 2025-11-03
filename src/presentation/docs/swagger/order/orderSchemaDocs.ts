export const createOrderBodySchemaDocs = {
  type: 'object',
  required: ['organizationId', 'items'],
  properties: {
    organizationId: { type: 'string', format: 'uuid' },
    items: {
      type: 'array',
      items: {
        type: 'object',
        required: ['productId', 'organizationId', 'quantity', 'priceAtPurchase'],
        properties: {
          productId: { type: 'string', format: 'uuid' },
          organizationId: { type: 'string', format: 'uuid' },
          quantity: { type: 'number' },
          priceAtPurchase: { type: 'number' }
        }
      }
    }
  }
}

export const createOrderResponseSchemaDocs = {
  201: {
    description: 'Created',
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid' },
      userId: { type: 'string', format: 'uuid' },
      organizationId: { type: 'string', format: 'uuid' },
      totalPrice: { type: 'number' },
      status: { type: 'string' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
      items: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            orderId: { type: 'string', format: 'uuid' },
            productId: { type: 'string', format: 'uuid' },
            organizationId: { type: 'string', format: 'uuid' },
            quantity: { type: 'number' },
            priceAtPurchase: { type: 'number' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        }
      }
    }
  }
}

