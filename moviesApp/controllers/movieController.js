var Movie = require('../models/movie');

exports.index = function (req, res, next) {
    res.render('index');
};

// Display list of all movies.
exports.movie_get = function (req, res, next) {

    Movie.find({})
        .exec(function (err, list_movies) {
            if (err) {
                return next(err);
            }
            //Successful, so send data
            res.send(list_movies);
        });
};

// update data
exports.movie_update = function (req, res, next) {

    Movie.updateOne({index: req.params.id}, {
        $set: {
            nbNotes: req.body.nbNotes,
            rating: req.body.rating
        }
    }, function (err, result) {
        if (err)
            return next(err);
    });
    res.end();
};
