const express = require("express");
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const app = express();

app.use(express.json());
app.use("/api/genres", genres);
app.use('/api/customers', customers);

const port = process.env.PORT || 3000;

app.listen(port , () => {
    console.log(`listening on port ${port}`);
});
