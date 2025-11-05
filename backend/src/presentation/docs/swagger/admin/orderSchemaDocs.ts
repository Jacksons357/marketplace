export const orderAdminListResponseSchemaDocs = {
  200: {
    description: 'OK',
    type: 'object',
    properties: {
      totalOrders: {
        type: 'number',
        example: 3,
      },
      totalItems: {
        type: 'number',
        example: 27,
      },
      orders: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'ecf2a0f6-be78-4f7d-b2bb-1e36acd522e1' },
            totalPrice: { type: 'number', example: 1048.62 },
            status: { type: 'string', example: 'PENDING' },
            createdAt: { type: 'string', format: 'date-time', example: '2025-11-04T23:58:37.657Z' },
            updatedAt: { type: 'string', format: 'date-time', example: '2025-11-04T23:58:37.657Z' },
            user: {
              type: 'object',
              nullable: true,
              properties: {
                id: { type: 'string', example: '1a2d454d-bc78-4cbf-afa3-80260dc7ebcd' },
                name: { type: 'string', example: 'Jackson da Silva Santos' },
                email: { type: 'string', example: 'devjackson.contato@gmail.com' },
                phone: { type: 'string', example: '11993154203' },
              },
            },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string', example: '65121181-72f7-45e1-b1a6-f5cf8cd1f2b4' },
                  productName: { type: 'string', example: 'Camiseta Sustentável' },
                  quantity: { type: 'number', example: 1 },
                  priceAtPurchase: { type: 'number', example: 85.51 },
                },
              },
            },
          },
        },
      },
    },
  },
}
