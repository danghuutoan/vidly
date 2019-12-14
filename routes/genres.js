const Joi = require("joi");
const express = require('express');
const router = express.Router();
const genres = [
    {id : 1, name : "action"},
    {id : 2, name : "comedy"},
    {id : 3, name : "romantic"}
]
router.get("/", (req, res) => {
    res.send(genres).status(200);
});

router.get("/:id", (req, res) => {

    const genre = genres.find(c => c.id == parseInt(req.params.id));
    if( genre) {
        res.send(genre).status(200);
    } else {
        res.send("Could not find the given genre").status(404);
    }
});

router.post("/", (req, res) => {
    const { error } = validateGenre(req.body);
    if (error){
        res.status(400).send(error.details[0].message)
        return
    }
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }

    genres.push(genre);
    res.send(genre).status(200);
});

router.put("/:id", (req, res) => {
// Look up the genre,
// If not existing, return 404
const genre = genres.find(c => c.id == parseInt(req.params.id));
if( !genre) res.send("Could not find the given genre").status(404);
// Validate
// If invalid, return 400 - bad request
const { error } = validateGenre(req.body);
if (error){
    res.status(400).send(error.details[0].message)
    return
}

// Update the genre
// Return the updated genre

genre.name = req.body.name
res.send(genre).status(200)

});

function validateGenre(genre){
    const schema = {
        name : Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema);
}

module.exports = router;