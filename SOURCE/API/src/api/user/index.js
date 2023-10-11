import { Router } from "express";
import { middleware as query } from "querymen";
import { middleware as body } from "bodymen";
import {
  create,
  index,
  show,
  update,
  destroy,
  indexNew,
  findUserByEmail
} from "./controller";
import { schema } from "./model";
export User, { schema } from "./model";

const router = new Router();
const {
  name,
  avatar,
  phone,
  email,
  type,
  role,
  address,
  password
} = schema.tree;

/**
 * @api {post} /users Create user
 * @apiName CreateUser
 * @apiGroup User
 * @apiParam name User's name.
 * @apiParam avatar User's avatar.
 * @apiParam phone User's phone.
 * @apiParam email User's email.
 * @apiParam type User's type.
 * @apiParam role User's role.
 * @apiParam address User's address.
 * @apiParam password User's password.
 * @apiSuccess {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 User not found.
 */
router.post(
  "/",
  body({ name, avatar, phone, email, type, role, address, password }),
  create
);

/**
 * @api {get} /users Retrieve users
 * @apiName RetrieveUsers
 * @apiGroup User
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of users.
 * @apiSuccess {Object[]} rows List of users.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */

router.get("/new", query(), indexNew);
router.get("/check-email/:email", findUserByEmail);

router.get("/", query({ phone, email, role, address }), index);

/**
 * @api {get} /users/:id Retrieve user
 * @apiName RetrieveUser
 * @apiGroup User
 * @apiSuccess {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 User not found.
 */
router.get("/:id", show);

/**
 * @api {put} /users/:id Update user
 * @apiName UpdateUser
 * @apiGroup User
 * @apiParam name User's name.
 * @apiParam avatar User's avatar.
 * @apiParam phone User's phone.
 * @apiParam email User's email.
 * @apiParam type User's type.
 * @apiParam role User's role.
 * @apiParam address User's address.
 * @apiParam password User's password.
 * @apiSuccess {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 User not found.
 */
router.put(
  "/:id",
  body({ name, avatar, phone, email, type, role, address, password }),
  update
);

/**
 * @api {delete} /users/:id Delete user
 * @apiName DeleteUser
 * @apiGroup User
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 User not found.
 */
router.delete("/:id", destroy);

export default router;
