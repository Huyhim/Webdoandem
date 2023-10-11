import { Router } from 'express';
import { middleware as query } from 'querymen';
import { middleware as body } from 'bodymen';
import {
  create,
  index,
  show,
  update,
  destroy,
  findUserByEmail,
  indexNew,
  searchCustomer
} from './controller';
import { schema } from './model';
export Customer, { schema } from './model';

const router = new Router();
const { name, avatar, phone, email, type, role, address, password } = schema.tree;

/**
 * @api {post} /customers Create customer
 * @apiName CreateCustomer
 * @apiGroup Customer
 * @apiParam name Customer's name.
 * @apiParam avatar Customer's avatar.
 * @apiParam phone Customer's phone.
 * @apiParam email Customer's email.
 * @apiParam type Customer's type.
 * @apiParam role Customer's role.
 * @apiParam address Customer's address.
 * @apiParam password Customer's password.
 * @apiSuccess {Object} customer Customer's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Customer not found.
 */
router.post('/', body({ name, avatar, phone, email, type, role, address, password }), create);

/**
 * @api {get} /customers Retrieve customers
 * @apiName RetrieveCustomers
 * @apiGroup Customer
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of customers.
 * @apiSuccess {Object[]} rows List of customers.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/new', query(), indexNew);
router.get('/searchCustomer', query({ name, phone, email, role, address }), searchCustomer);
router.get('/', query(), index);

/**
 * @api {get} /customers/:id Retrieve customer
 * @apiName RetrieveCustomer
 * @apiGroup Customer
 * @apiSuccess {Object} customer Customer's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Customer not found.
 */
router.get('/:id', show);

/**
 * @api {put} /customers/:id Update customer
 * @apiName UpdateCustomer
 * @apiGroup Customer
 * @apiParam name Customer's name.
 * @apiParam avatar Customer's avatar.
 * @apiParam phone Customer's phone.
 * @apiParam email Customer's email.
 * @apiParam type Customer's type.
 * @apiParam role Customer's role.
 * @apiParam address Customer's address.
 * @apiParam password Customer's password.
 * @apiSuccess {Object} customer Customer's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Customer not found.
 */

router.get('/check-email/:email', findUserByEmail);

router.put('/:id', body({ name, avatar, phone, email, type, role, address, password }), update);

/**
 * @api {delete} /customers/:id Delete customer
 * @apiName DeleteCustomer
 * @apiGroup Customer
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Customer not found.
 */
router.delete('/:id', destroy);

export default router;
