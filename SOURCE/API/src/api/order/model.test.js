import { Order } from '.'

let order

beforeEach(async () => {
  order = await Order.create({ name: 'test', description: 'test', statusOrder: 'test', statusShip: 'test', message: 'test', products: 'test', idUser: 'test', user: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = order.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(order.id)
    expect(view.name).toBe(order.name)
    expect(view.description).toBe(order.description)
    expect(view.statusOrder).toBe(order.statusOrder)
    expect(view.statusShip).toBe(order.statusShip)
    expect(view.message).toBe(order.message)
    expect(view.products).toBe(order.products)
    expect(view.idUser).toBe(order.idUser)
    expect(view.user).toBe(order.user)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = order.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(order.id)
    expect(view.name).toBe(order.name)
    expect(view.description).toBe(order.description)
    expect(view.statusOrder).toBe(order.statusOrder)
    expect(view.statusShip).toBe(order.statusShip)
    expect(view.message).toBe(order.message)
    expect(view.products).toBe(order.products)
    expect(view.idUser).toBe(order.idUser)
    expect(view.user).toBe(order.user)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
