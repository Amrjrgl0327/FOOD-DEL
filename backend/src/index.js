import express from "express";
import { connectDB } from "./database/db.js";
import { bookRouter } from "./route/book.js";
import { movieRouter } from "./route/movie.js";
import { authRouter } from "./route/auth/auth.js";
import cors from "cors";
import { categoriesRouter } from "./route/categories/categories.js";

const app = express();
const port = 8000;

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

connectDB();
app.use(express.json());
app.use("/book", bookRouter);
app.use("/movie", movieRouter);
app.use("/auth", authRouter);
app.use("/categories", categoriesRouter);

app.listen(port, () => {
  console.log("server has started successfully on:", port);
});
