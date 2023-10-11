import { Router } from "express";
import { middleware as query } from "querymen";
import { middleware as body } from "bodymen";
import { create, index, show, update, destroy } from "./controller";
import { schema } from "./model";
export Product, { schema } from "./model";

const router = new Router();
const {
  name,
  type,
  image,
  price,
  status,
  description,
  category,
  highlight,
  topBuy
} = schema.tree;

/**
 * @api {post} /products Create product
 * @apiName CreateProduct
 * @apiGroup Product
 * @apiParam name Product's name.
 * @apiParam type Product's type.
 * @apiParam image Product's image.
 * @apiParam price Product's price.
 * @apiParam status Product's status.
 * @apiParam description Product's description.
 * @apiParam category Product's category.
 * @apiParam highlight Product's highlight.
 * @apiParam topBuy Product's topBuy.
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 */
router.post(
  "/",
  body({
    name,
    type,
    image,
    price,
    status,
    description,
    category,
    highlight,
    topBuy
  }),
  create
);

/**
 * @api {get} /products Retrieve products
 * @apiName RetrieveProducts
 * @apiGroup Product
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of products.
 * @apiSuccess {Object[]} rows List of products.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */

router.get(
  "/",
  query({
    category,
    name,
    status
  }),
  index
);

// router.get("/", query(), index);

/**
 * @api {get} /products/:id Retrieve product
 * @apiName RetrieveProduct
 * @apiGroup Product
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 */
router.get("/:id", show);

/**
 * @api {put} /products/:id Update product
 * @apiName UpdateProduct
 * @apiGroup Product
 * @apiParam name Product's name.
 * @apiParam type Product's type.
 * @apiParam image Product's image.
 * @apiParam price Product's price.
 * @apiParam status Product's status.
 * @apiParam description Product's description.
 * @apiParam category Product's category.
 * @apiParam highlight Product's highlight.
 * @apiParam topBuy Product's topBuy.
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 */
router.put(
  "/:id",
  body({
    name,
    type,
    image,
    price,
    status,
    description,
    category,
    highlight,
    topBuy
  }),
  update
);

/**
 * @api {delete} /products/:id Delete product
 * @apiName DeleteProduct
 * @apiGroup Product
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Product not found.
 */
router.delete("/:id", destroy);

export default router;
