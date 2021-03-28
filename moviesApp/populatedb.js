#! /usr/bin/env node

console.log('This script populates some test movies to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async');
var Movie = require('./models/movie');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var movies = [];

function movieCreate(title, rating, nbNotes, index, cb) {
    movieDetail = {
        title: title,
        rating: rating,
        nbNotes: nbNotes,
        index: index
    };

    var movie = new Movie(movieDetail);
    movie.save(function (err) {
        if (err) {
            cb(err, null);
            return
        }
        console.log('New Movie: ' + movie);
        movies.push(movie);
        cb(null, movie)
    }  );
}

function createMovies(cb) {
    async.parallel([
            function(callback) {
                movieCreate('Matrix', 9.0, 100, 1, callback);
            },
            function(callback) {
                movieCreate('Back To the Future', 9.0, 1, 2, callback);
            },
            function(callback) {
                movieCreate('Star Trek', 7.0, 6, 3, callback);
            },
            function(callback) {
                movieCreate('Star Wars V', 10.0, 100000, 4, callback);
            },
            function(callback) {
                movieCreate('Star Wars IX', 3.0, 1000, 5, callback);
            },
            function(callback) {
                movieCreate('Kimi no Na wa', 10.0, 10000000000, 6, callback);
            },
            function(callback) {
                movieCreate('Kill Bill', 7.5, 1000, 7, callback);
            }
        ],
        // optional callback
        cb);
}

async.series([
        createMovies
    ],
// Optional callback
    function(err, results) {
        if (err) {
            console.log('FINAL ERR: '+err);
        }
        // All done, disconnect from database
        mongoose.connection.close();
    });