import { success, notFound } from "../../services/response/";
import { User } from ".";

export const create = ({ bodymen: { body } }, res, next) =>
  User.create(body)
    .then(user => user.view(true))
    .then(success(res, 201))
    .catch(next);

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  User.count(query)
    .then(count =>
      User.find(query, select, cursor).then(users => ({
        count,
        rows: users.map(user => user.view())
      }))
    )
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  User.findById(params.id)
    .then(notFound(res))
    .then(user => (user ? user.view() : null))
    .then(success(res))
    .catch(next);

export const update = ({ bodymen: { body }, params }, res, next) =>
  User.findById(params.id)
    .then(notFound(res))
    .then(user => (user ? Object.assign(user, body).save() : null))
    .then(user => (user ? user.view(true) : null))
    .then(success(res))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  User.findById(params.id)
    .then(notFound(res))
    .then(user => (user ? user.remove() : null))
    .then(success(res, 204))
    .catch(next);

export const indexNew = ({ querymen: { query, select, cursor } }, res, next) =>
  User.count(query)
    .then(count =>
      User.find(query, select, cursor)
        .sort("desc")
        .then(user => ({
          count,
          rows: user.map(user => user.view())
        }))
    )
    .then(success(res))
    .catch(next);

export const findUserByEmail = ({ params }, res, next) =>
  User.findOne({ email: params.email })
    .then(notFound(res))
    .then(user => (user ? user.view() : null))
    .then(success(res))
    .catch(next);
