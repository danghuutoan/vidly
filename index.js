const express = require("express");
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true,  useUnifiedTopology: true, useFindAndModify: false})
.then(() => { console.log("connected to mongo DB")})
.catch((err) => console.log('could not connect to mongo DB'))

app.use(express.json());
app.use("/api/genres", genres);
app.use('/api/customers', customers);

const port = process.env.PORT || 3000;

app.listen(port , () => {
    console.log(`listening on port ${port}`);
});
