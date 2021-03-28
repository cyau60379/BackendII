var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MovieSchema = new Schema(
    {
        title: {type: String, required: true},
        rating: {type: Number, required: true},
        nbNotes: {type: Number, required: true},
        index: {type: Number, required: true}
    }
);

// Virtual for movie's URL
MovieSchema
    .virtual('url')
    .get(function () {
        return '/movies/' + this._id;
    });

//Export model
module.exports = mongoose.model('Movie', MovieSchema);
