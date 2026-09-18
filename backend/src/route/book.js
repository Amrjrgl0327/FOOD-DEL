import { Router } from "express";
import {
  createBook,
  deleteBook,
  getBooks,
  updateBook,
} from "../controller/book.js";

export const bookRouter = Router();
bookRouter
  .post("/", createBook)
  .get("/", getBooks)
  .delete("/", deleteBook)
  .put("/", updateBook);
