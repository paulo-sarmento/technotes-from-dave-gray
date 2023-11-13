import Express from "express";
import {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
} from "../controllers/usersController.js";
import verifyJWT from "../middleware/verifyJWT.js";

const userRoutes = Express.Router();

userRoutes.use(verifyJWT);

userRoutes
  .route("/")
  .get(getAllUsers)
  .post(createNewUser)
  .patch(updateUser)
  .delete(deleteUser);

export default userRoutes;
