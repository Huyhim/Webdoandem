import { User } from '.'

let user

beforeEach(async () => {
  user = await User.create({ name: 'test', avatar: 'test', phone: 'test', email: 'test', type: 'test', role: 'test', address: 'test', password: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = user.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(user.id)
    expect(view.name).toBe(user.name)
    expect(view.avatar).toBe(user.avatar)
    expect(view.phone).toBe(user.phone)
    expect(view.email).toBe(user.email)
    expect(view.type).toBe(user.type)
    expect(view.role).toBe(user.role)
    expect(view.address).toBe(user.address)
    expect(view.password).toBe(user.password)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = user.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(user.id)
    expect(view.name).toBe(user.name)
    expect(view.avatar).toBe(user.avatar)
    expect(view.phone).toBe(user.phone)
    expect(view.email).toBe(user.email)
    expect(view.type).toBe(user.type)
    expect(view.role).toBe(user.role)
    expect(view.address).toBe(user.address)
    expect(view.password).toBe(user.password)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
