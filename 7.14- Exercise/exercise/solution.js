const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true,  useUnifiedTopology: true })
.then(() => console.log("connected to mongodb"))
.catch((err) => console.log("Cannot connect to mongodb "));

const courseSchema = mongoose.Schema({
    name: String,
    author: String,
    tags: [ String] ,
    price: Number,
    isPublished: Boolean,
    date: { type: Date, default: Date.now }
})

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
    const courses = await Course.find({isPublished: true, tags: 'backend'})
    .sort({name: 1})
    .select({name: 1, author: 1});
    console.log(courses);
}

getCourses();