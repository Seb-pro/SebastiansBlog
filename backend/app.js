const express = require('express');
const mongoose = require('mongoose');

const Blog = require('./models/blog');

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://Sebastian:eiKe4cmPM3ngJQEs@cluster0.dvmsw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
.then(() => {
  console.log('Connected')
})
.catch(() => {
  console.log('Connection failed')
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH,  OPTIONS");
  next();
});

app.post("/api/blogs", (req, res, next) => {
  const blog = new Blog({
    title: req.body.title,
    content: req.body.content
  });
  blog.save().then(result => {
    res.status(201).json({
      message: 'Succes',
      blogId: result._id
    });
  });
});

app.get('/api/blogs',(req, res, next) => {
  Blog.find().then(document => {
    res.status(200).json({
      message: 'succes',
      blogs: document
    });
  });
 });

 app.get("/api/blogs/:id", (req, res) => {
   Blog.findById(req.params.id).then(blog => {
     if(blog) {
      res.status(200).json(blog);
     }else {
       res.status(404).json({ message: 'blog not found' });
     }
   });
 });

 app.put("/api/blogs/:id", (req, res) => {
   const blog = new Blog({
     _id: req.body.id,
     title: req.body.title,
     content: req.body.content
   });
   Blog.updateOne({_id: req.params.id}, blog).then(result => {
     res.status(200).json({ message: "Updated"})
   });
 })

 app.delete("/api/blogs/:id", (req, res, next) => {
   Blog.deleteOne({_id: req.params.id}).then(result => {
     console.log(result);
     res.status(200).json({ message: "Deleted succesful"});
   });
 });

module.exports = app;
