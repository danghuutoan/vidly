const mongoose = require('mongoose');
const Joi = require("joi");
const express = require('express');
const router = express.Router();

mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true,  useUnifiedTopology: true, useFindAndModify: false})
.then(() => { console.log("connected to mongo DB")})
.catch((err) => console.log('could not connect to mongo DB'))

const genresSchema = mongoose.Schema({
    id: Number,
    name: {type: String, required: true}
})

const Genre = mongoose.model('Genre', genresSchema);
router.get("/", async (req, res) => {
    const genres = await Genre.find();
    res.send(genres).status(200);
});

router.get("/:id", async (req, res) => {
    try{
        const genre = await Genre.findById(req.params.id);

        if( genre) {
            res.send(genre).status(200);
        } else {
            res.send("Could not find the given genre").status(404);
        }
    }
    catch(ex) {
        res.send(ex.message).status(400);
    }
    
});

router.post("/", async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error){
        res.status(400).send(error.details[0].message)
        return
    }
    let genre = new Genre({name: req.body.name});
    genre = await genre.save();
    res.send(genre).status(200);
});

router.put("/:id", async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error){
        res.status(400).send(error.details[0].message);
        return
    }

    const genre = Genre.findByIdAndUpdate(req.params.id, {name: req.params.name}, {new: true});

    if( !genre) return res.send("Could not find the given genre").status(404);

    return res.send(genre).status(200);

});

router.delete("/:id", async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if( !genre) return res.send("Could not find the given genre").status(404);

    return res.send(genre).status(200);
});
function validateGenre(genre){
    const schema = {
        name : Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema);
}

module.exports = router;