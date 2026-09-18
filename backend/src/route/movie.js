import { Router } from "express";

import {
  createMovie,
  getMovies,
  updateMovie,
  deleteMovie,
} from "../controller/movie.js";

export const movieRouter = Router();
movieRouter
  .post("/", createMovie)
  .get("/", getMovies)
  .delete("/", deleteMovie)
  .put("/", updateMovie);
