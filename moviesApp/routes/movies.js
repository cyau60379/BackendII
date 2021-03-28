var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

// Require controller module.
var movie_controller = require('../controllers/movieController');

// GET home page.
router.get('/', movie_controller.index);

// GET request for retrieving movies
router.get('/getall', movie_controller.movie_get);

// POST request to update note.
router.post('/:id/update/', jsonParser, movie_controller.movie_update);

module.exports = router;
