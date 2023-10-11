import { Product } from '.'

let product

beforeEach(async () => {
  product = await Product.create({ name: 'test', type: 'test', image: 'test', price: 'test', status: 'test', description: 'test', category: 'test', highlight: 'test', topBuy: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = product.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(product.id)
    expect(view.name).toBe(product.name)
    expect(view.type).toBe(product.type)
    expect(view.image).toBe(product.image)
    expect(view.price).toBe(product.price)
    expect(view.status).toBe(product.status)
    expect(view.description).toBe(product.description)
    expect(view.category).toBe(product.category)
    expect(view.highlight).toBe(product.highlight)
    expect(view.topBuy).toBe(product.topBuy)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = product.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(product.id)
    expect(view.name).toBe(product.name)
    expect(view.type).toBe(product.type)
    expect(view.image).toBe(product.image)
    expect(view.price).toBe(product.price)
    expect(view.status).toBe(product.status)
    expect(view.description).toBe(product.description)
    expect(view.category).toBe(product.category)
    expect(view.highlight).toBe(product.highlight)
    expect(view.topBuy).toBe(product.topBuy)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
