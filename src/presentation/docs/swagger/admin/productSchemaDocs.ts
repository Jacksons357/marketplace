export const productCreateBodySchemaDocs = {
  type: 'object',
  required: ['name', 'price', 'category', 'imageUrl', 'stockQty', 'weightGrams'],
  properties: {
    name: { type: 'string' },
    description: { type: 'string' },
    price: { type: 'number' },
    category: { type: 'string' },
    imageUrl: { type: 'string' },
    stockQty: { type: 'number' },
    weightGrams: { type: 'number' }
  }
}

export const productCreateResponseSchemaDocs = {
  201: {
    description: 'Created',
    type: 'object',
    properties: {
      id: { type: 'string' },
      organizationId: { type: 'string' },
      name: { type: 'string' },
      description: { type: 'string' },
      price: { type: 'number' },
      category: { type: 'string' },
      imageUrl: { type: 'string' },
      stockQty: { type: 'number' },
      weightGrams: { type: 'number' }
    }
  }
}

export const productListQuerySchemaDocs = {
  type: 'object',
  properties: {
    page: { type: 'number'},
    limit: { type: 'number'},
    category: { type: 'string'},
    priceMin: { type: 'number'},
    priceMax: { type: 'number'},
    search: { type: 'string'}
  }
}


export const productListResponseSchemaDocs = {
  200: {
    description: 'OK',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        organizationId: { type: 'string' },
        name: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'number' },
        category: { type: 'string' },
        imageUrl: { type: 'string' },
        stockQty: { type: 'number' },
        weightGrams: { type: 'number' }
      }
    }
  }
}

export const productUpdateBodySchemaDocs = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    description: { type: 'string' },
    price: { type: 'number' },
    category: { type: 'string' },
    imageUrl: { type: 'string' },
    stockQty: { type: 'number' },
    weightGrams: { type: 'number' }
  }
}

export const productUpdateResponseSchemaDocs = {
  200: {
    description: 'OK',
    type: 'object',
    properties: {
      id: { type: 'string' },
      organizationId: { type: 'string' },
      name: { type: 'string' },
      description: { type: 'string' },
      price: { type: 'number' },
      category: { type: 'string' },
      imageUrl: { type: 'string' },
      stockQty: { type: 'number' },
      weightGrams: { type: 'number' },
      createdAt: { type: 'string' },
      updatedAt: { type: 'string' },
    }
  }
}