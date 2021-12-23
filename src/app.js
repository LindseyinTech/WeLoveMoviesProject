if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");
const cors = require("cors");

// process.env.NODE_ENV
// process.env.NODE_ENV === 'production' : productionUrl : devUrl
app.use(cors({origin: "http://localhost:3000"}));

app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);


// Not Found Handler
app.use((req, res, next) => {
  next({ status: 404, message: `Not found: ${req.originalUrl}` });
});

// Error Handler
app.use((error, req, res, next) => {
  const { status = 500, message = "Something went wrong!" } = error;
  console.error(error)
  res.status(status).json({ error: message });
});

module.exports = app;
