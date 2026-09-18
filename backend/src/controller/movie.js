import { Movie } from "../models/moviesSchema.js";

export const createMovie = async (req, res) => {
  try {
    const body = req.body;
    const movie = {
      movieTitle: body.movieTitle,
      date: body.date,
      description: body.description,
    };
    await Movie.create(movie);
    res.status(200).send("Successfully added a movie");
  } catch (error) {
    res.status(500).send("Failed to create a movie");
  }
};

export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();

    res.json(movies);
  } catch (error) {
    res.status(500).send("cant find movies");
  }
};

export const deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.body.id);

    res.send("success");
  } catch (error) {
    res.send("failed");
  }
};

export const updateMovie = async (req, res) => {
  try {
    const movieId = req.body.id;

    const newMovie = {
      movieTitle: req.body.movieTitle,
      date: req.body.date,
      description: req.body.description,
    };

    const updatedMovie = await Movie.findByIdAndUpdate(movieId, newMovie);

    res.send("Changed the movie", movieId);
  } catch (error) {
    res.send("Failed to change");
  }
};
