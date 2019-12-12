const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/mongo-exercises', { useNewUrlParser: true,  useUnifiedTopology: true })
.then(() => console.log("connected to mongodb"))
.catch((err) => console.log("Cannot connect to mongodb "));

const courseSchema = mongoose.Schema({
    name: String,
    author: String,
    tags: [ String] ,
    date: { type: Date, default: Date.now }
})

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
    const courses = await Course.find();
    console.log(courses);
}

getCourses();