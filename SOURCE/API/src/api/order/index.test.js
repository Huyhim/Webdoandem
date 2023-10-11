import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Order } from '.'

const app = () => express(apiRoot, routes)

let order

beforeEach(async () => {
  order = await Order.create({})
})

test('POST /orders 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ name: 'test', description: 'test', statusOrder: 'test', statusShip: 'test', message: 'test', products: 'test', idUser: 'test', user: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.statusOrder).toEqual('test')
  expect(body.statusShip).toEqual('test')
  expect(body.message).toEqual('test')
  expect(body.products).toEqual('test')
  expect(body.idUser).toEqual('test')
  expect(body.user).toEqual('test')
})

test('GET /orders 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /orders/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${order.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(order.id)
})

test('GET /orders/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /orders/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${order.id}`)
    .send({ name: 'test', description: 'test', statusOrder: 'test', statusShip: 'test', message: 'test', products: 'test', idUser: 'test', user: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(order.id)
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.statusOrder).toEqual('test')
  expect(body.statusShip).toEqual('test')
  expect(body.message).toEqual('test')
  expect(body.products).toEqual('test')
  expect(body.idUser).toEqual('test')
  expect(body.user).toEqual('test')
})

test('PUT /orders/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ name: 'test', description: 'test', statusOrder: 'test', statusShip: 'test', message: 'test', products: 'test', idUser: 'test', user: 'test' })
  expect(status).toBe(404)
})

test('DELETE /orders/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${order.id}`)
  expect(status).toBe(204)
})

test('DELETE /orders/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
