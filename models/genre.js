const mongoose = require('mongoose');
const Joi = require("joi");

const genresSchema = mongoose.Schema({
    id: Number,
    name: {type: String, required: true}
})

const Genre = mongoose.model('Genre', genresSchema);

function validateGenre(genre){
    const schema = {
        name : Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema);
}

exports.Genre = Genre;
exports.validate = validateGenre;