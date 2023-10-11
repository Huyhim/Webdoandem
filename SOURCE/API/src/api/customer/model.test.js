import { Customer } from '.'

let customer

beforeEach(async () => {
  customer = await Customer.create({ name: 'test', avatar: 'test', phone: 'test', email: 'test', type: 'test', role: 'test', address: 'test', userName: 'test', password: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = customer.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(customer.id)
    expect(view.name).toBe(customer.name)
    expect(view.avatar).toBe(customer.avatar)
    expect(view.phone).toBe(customer.phone)
    expect(view.email).toBe(customer.email)
    expect(view.type).toBe(customer.type)
    expect(view.role).toBe(customer.role)
    expect(view.address).toBe(customer.address)
    expect(view.userName).toBe(customer.userName)
    expect(view.password).toBe(customer.password)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = customer.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(customer.id)
    expect(view.name).toBe(customer.name)
    expect(view.avatar).toBe(customer.avatar)
    expect(view.phone).toBe(customer.phone)
    expect(view.email).toBe(customer.email)
    expect(view.type).toBe(customer.type)
    expect(view.role).toBe(customer.role)
    expect(view.address).toBe(customer.address)
    expect(view.userName).toBe(customer.userName)
    expect(view.password).toBe(customer.password)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
