const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reduceProperties = require("../utils/reduce-properties");

async function list(req, res, next) {
  let data = await service.list();
  const reduceMovies = reduceProperties("theater_id", {
    title: ["movies", null, "title"],
    rating: ["movies", null, "rating"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    image_url: ["movies", null, "image_url"],
    movie_id: ["movies", null, "movie_id"],
    is_showing: ["movies", null, "is_showing"],
    description: ["movies", null, "description"],
  });
  res.json({ data: reduceMovies(data) });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
