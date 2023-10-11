import { Router } from "express";
import { middleware as query } from "querymen";
import { middleware as body } from "bodymen";
import { create, index, show, update, destroy } from "./controller";
import { schema } from "./model";
export Order, { schema } from "./model";

const router = new Router();
const {
  name,
  description,
  statusOrder,
  statusShip,
  message,
  products,
  idUser,
  user
} = schema.tree;

/**
 * @api {post} /orders Create order
 * @apiName CreateOrder
 * @apiGroup Order
 * @apiParam name Order's name.
 * @apiParam description Order's description.
 * @apiParam statusOrder Order's statusOrder.
 * @apiParam statusShip Order's statusShip.
 * @apiParam message Order's message.
 * @apiParam products Order's products.
 * @apiParam idUser Order's idUser.
 * @apiParam user Order's user.
 * @apiSuccess {Object} order Order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order not found.
 */
router.post(
  "/",
  body({
    name,
    description,
    statusOrder,
    statusShip,
    message,
    products,
    idUser,
    user
  }),
  create
);

/**
 * @api {get} /orders Retrieve orders
 * @apiName RetrieveOrders
 * @apiGroup Order
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of orders.
 * @apiSuccess {Object[]} rows List of orders.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get(
  "/",
  query({
    idUser,
    user,
    statusOrder,
    statusShip
  }),
  index
);

/**
 * @api {get} /orders/:id Retrieve order
 * @apiName RetrieveOrder
 * @apiGroup Order
 * @apiSuccess {Object} order Order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order not found.
 */

router.get("/:id", show);

/**
 * @api {put} /orders/:id Update order
 * @apiName UpdateOrder
 * @apiGroup Order
 * @apiParam name Order's name.
 * @apiParam description Order's description.
 * @apiParam statusOrder Order's statusOrder.
 * @apiParam statusShip Order's statusShip.
 * @apiParam message Order's message.
 * @apiParam products Order's products.
 * @apiParam idUser Order's idUser.
 * @apiParam user Order's user.
 * @apiSuccess {Object} order Order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order not found.
 */
router.put(
  "/:id",
  body({
    name,
    description,
    statusOrder,
    statusShip,
    message,
    products,
    idUser,
    user
  }),
  update
);

/**
 * @api {delete} /orders/:id Delete order
 * @apiName DeleteOrder
 * @apiGroup Order
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Order not found.
 */
router.delete("/:id", destroy);

export default router;
