const mongoose = require('mongoose');
const express = require('express');

const movieSchema = new mongoose.Schema({
    id: String,
    rank: String,
    title: String,
    fullTitle: String,
    year: String,
    image: String,
    crew: String,
    imDbRating: String,
})

const movie_store = mongoose.model('movie_store', movieSchema);

const movieRouter = express.Router();

movieRouter.get('/all', getMovies);
movieRouter.get('/movietitle/:title', getMovieByTitle);
movieRouter.get('/movierating/:rating', getMovieByRating);
movieRouter.get('/movie', searchMovie);

module.exports = movieRouter;

async function getMovieByTitle(req, res) {
    try {
        let { title } = req.params;
        let movie = await movie_store.find({ title: title });
        res.status(202).send({
            data: movie
        });
    } catch (error) {
        return res.status(400).send(error);
    }
}

async function getMovieByRating(req, res) {
    try {
        let { rating } = req.params;
        let movie = await movie_store.find({ rating: rating });
        res.status(202).send({
            data: movie
        });
    } catch (error) {
        return res.status(400).send(error);
    }
}

async function searchMovie(req, res) {
    try {
        let { q } = req.query;
        let movie = await movie_store.find({ title: { $regex: q } });
        res.status(202).send({
            data: movie
        });
    } catch (error) {
        return res.status(400).send(error);
    }
}

async function getMovies(req, res) {
    try {
        let { field, sortBy, skip, limit } = req.query;
        let movie = await movie_store.find().sort({ [field]: sortBy }).skip(skip).limit(limit);
        res.status(202).send({
            data: movie
        });
    } catch (error) {
        return res.status(400).send(error);
    }
}