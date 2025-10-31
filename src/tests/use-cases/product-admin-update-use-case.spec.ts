import { describe, it, expect } from 'vitest'
import { ProductAdminUpdateUseCase } from '../../domain/use-cases/product-admin-update.usecase'
import { InMemoryProductRepository } from '../repositories/in-memory-product-repository'
import { InMemoryUserRepository } from '../repositories/in-memory-user-repository'
import { User } from '../../domain/entities/User'

describe('ProductAdminUpdateUseCase', () => {
  it('deve atualizar o produto da organização do usuário', async () => {
    const productRepo = new InMemoryProductRepository()
    const userRepo = new InMemoryUserRepository()
    const sut = new ProductAdminUpdateUseCase(productRepo, userRepo)

    const user = new User(
      'user-1',
      'User 1',
      'user1@example.com',
      '1234567890',
      'hashed-password',
      'ADMIN',
      'org-1',
    )
    await userRepo.create(user)

    const product = await productRepo.create({
      id: 'p1',
      organizationId: 'org-1',
      name: 'Produto antigo',
      price: 10,
      description: 'Descrição do produto',
      category: 'Categoria do produto',
      imageUrl: 'https://example.com/image.jpg',
      stockQty: 100,
      weightGrams: 500,
    })

    const result = await sut.execute({
      userId: user.id,
      productId: product.id,
      data: { name: 'Produto novo', price: 20 },
    })

    expect(result.name).toBe('Produto novo')
    expect(result.price).toBe(20)
  })

  it('não deve permitir atualizar produto de outra organização', async () => {
    const productRepo = new InMemoryProductRepository()
    const userRepo = new InMemoryUserRepository()
    const sut = new ProductAdminUpdateUseCase(productRepo, userRepo)

    const user = new User(
      'user-1',
      'org-1',
      'User 1',
      'user1@example.com',
      '1234567890',
      'ADMIN',
      'hashed-password',
    )
    await userRepo.create(user)
    const product = await productRepo.create({
      id: 'p2',
      organizationId: 'org-2',
      name: 'Produto de outra ONG',
      price: 10,
      description: 'Descrição do produto',
      category: 'Categoria do produto',
      imageUrl: 'https://example.com/image.jpg',
      stockQty: 100,
      weightGrams: 500,
    })
    
    await expect(() =>
      sut.execute({ userId: user.id, productId: product.id, data: { price: 15 } })
    ).rejects.toThrowError(/not allowed/i)
  })
})
