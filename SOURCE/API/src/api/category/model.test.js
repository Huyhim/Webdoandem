import { Category } from '.'

let category

beforeEach(async () => {
  category = await Category.create({ name: 'test', key: 'test', description: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = category.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(category.id)
    expect(view.name).toBe(category.name)
    expect(view.key).toBe(category.key)
    expect(view.description).toBe(category.description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = category.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(category.id)
    expect(view.name).toBe(category.name)
    expect(view.key).toBe(category.key)
    expect(view.description).toBe(category.description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
