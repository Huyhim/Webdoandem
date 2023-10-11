import { success, notFound } from '../../services/response/';
import { Customer } from '.';

export const create = ({ bodymen: { body } }, res, next) => {
  // const user = body
  // bcrypt.hash(user.password, 10, function(err, hash) {
  //   if (err) {
  //     return next(err)
  //   }
  //   user.password = hash
  //   next()
  // })

  Customer.create(body)
    .then(customer => customer.view(true))
    .then(success(res, 201))
    .catch(next);
};

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Customer.count(query)
    .then(count =>
      Customer.find(query, select, cursor).then(customers => ({
        count,
        rows: customers.map(customer => customer.view())
      }))
    )
    .then(success(res))
    .catch(next);

export const indexNew = ({ querymen: { query, select, cursor } }, res, next) =>
  Customer.count(query)
    .then(count =>
      Customer.find(query, select, cursor)
        .sort('desc')
        .then(customers => ({
          count,
          rows: customers.map(customer => customer.view())
        }))
    )
    .then(success(res))
    .catch(next);

export const searchCustomer = ({ querymen: { query, select, cursor } }, res, next) => {
  let name = query.name ? query.name + ' ' : '';
  let phone = query.phone ? query.phone + ' ' : '';
  let email = query.email ? query.email + ' ' : '';
  let role = query.role ? query.role + ' ' : '';
  Customer.count(query)
    .then(count =>
      Customer.find({ $text: { $search: name } }, select, cursor).then(customers => ({
        count,
        rows: customers.map(customer => customer.view())
      }))
    )
    .then(success(res))
    .catch(next);
};

export const show = ({ params }, res, next) =>
  Customer.findById(params.id)
    .then(notFound(res))
    .then(customer => (customer ? customer.view() : null))
    .then(success(res))
    .catch(next);

export const update = ({ bodymen: { body }, params }, res, next) =>
  Customer.findById(params.id)
    .then(notFound(res))
    .then(customer => (customer ? Object.assign(customer, body).save() : null))
    .then(customer => (customer ? customer.view(true) : null))
    .then(success(res))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  Customer.findById(params.id)
    .then(notFound(res))
    .then(customer => (customer ? customer.remove() : null))
    .then(success(res, 204))
    .catch(next);

// function findUserByEmail(email) {
//   if (email) {
//     return new Promise((resolve, reject) => {
//       Customer.findOne({ email: email }).exec((err, doc) => {
//         if (err) return reject(err);
//         if (doc) return reject(new Error('This email already exists. Please enter another email.'));
//         else return resolve(email);
//       });
//     });
//   }
// }
export const findUserByEmail = ({ params }, res, next) =>
  Customer.findOne({ email: params.email })
    .then(notFound(res))
    .then(customer => (customer ? customer.view() : null))
    .then(success(res))
    .catch(next);
