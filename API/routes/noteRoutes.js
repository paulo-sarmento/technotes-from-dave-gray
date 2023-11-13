import Express from "express";
import {
  getAllNotes,
  createNewNote,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";
import verifyJWT from "../middleware/verifyJWT.js";

const noteRoutes = Express.Router();

noteRoutes.use(verifyJWT);

noteRoutes
  .route("/")
  .get(getAllNotes)
  .post(createNewNote)
  .patch(updateNote)
  .delete(deleteNote);

export default noteRoutes;
