/*
 Authors:
 Your name and student #: Hellemond Dargalaii A01262207
 Your Partner's Name and student #: NA
 (Make sure you also specify on the Google Doc)
*/
allMovies = []
const { query } = require("express");
const express = require("express");
const fs = require("fs");

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => res.render("pages/index", {movieItem: allMovies}));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
  let movies = req.body.movies
  let movieList = movies.split(',')
  for (i of movieList){
    allMovies.push(i)
  }
  res.redirect('/')
});

app.get("/myListQueryString", (req, res) => {
  queryMovies =[]
  let movies = req.query
  for (i in movies){
    queryMovies.push(movies[i])
  }
  res.render("pages/index", {movieItem: queryMovies});
});

app.get("/search/:movieName", (req, res) => {

  let nameOfMovie = req.params.movieName.toLowerCase();;;;;;;;;;

  fs.readFile("movieDescriptions.txt", "utf-8", (err, data) =>{
    const movieArray = []
    if(err){
      console.log(err);
    }else{
      fullMovie = data.split(`\n`)

      for (i of fullMovie){
        let currentMovie = i.split(":")
        console.log(fullMovie)
        movieArray.push( {title: `${currentMovie[0]}`, desc: `${currentMovie[1]}` } )
      }

      for (i of movieArray){
        if (nameOfMovie == i.title.toLowerCase()){
          res.render("pages/searchResult", {movieTitle: i.title, movieDesc: i.desc});
          break;
        }
      }
      
    }
  })
  
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});