import { Router } from "express";
import product from "./product";
import category from "./category";

import order from "./order";
import customer from "./customer";
import user from "./user";
// import product from './product'

const router = new Router();

router.use("/products", product);
router.use("/categories", category);
router.use("/orders", order);
router.use("/customers", customer);
router.use("/users", user);
// router.use('/products', product)

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */

export default router;
