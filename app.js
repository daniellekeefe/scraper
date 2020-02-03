let express = require("express");
let axios = require("axios");
let cheerio = require("cheerio");
let mongoose = require("mongoose"); // Require Mongoose to store story in database


// Requiring the `IStory` model for accessing the `story` collection
let PORT = process.env.PORT || 3000;

// Initialize Express
let app = express();

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraper";
mongoose.connect(MONGODB_URI);
var db = require("./models")

// Configure middleware
// Parse request body as JSON
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));

// Simple index route
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "./public/index.html"));
});

app.get("/api/all", (req, res) => {
  db.Scraper.find({}).then(data => {
    res.json(data)
  })
})

// Start the server
app.listen(PORT, function () {
  console.log("App listening on port " + PORT);
})
app.get("/scrapes", function (req, res) {

  axios.get("https://americanliterature.com/poems-for-kids").then(function (response) {

    // Load the HTML into cheerio
    let $ = cheerio.load(response.data);

    // Make an empty array for saving our scraped info
    let listItems = [];

    // With cheerio, look at each award-winning site, enclosed in "figure" tags with the class name "site"
    $(".smartlist").children('li').each(function (i, element) {
      let title = $(element).children(".sslink").text()
      let description = $(element).children(".intros").text()
      console.log(title, " ", description)
      db.Scraper.create({
        title,
        description
      }).then((response) => console.log("X", response))

      //     /* Cheerio's find method will "find" the first matching child element in a parent.
      //      *    We start at the current element, then "find" its first child a-tag.

    });

    // After looping through each element found, log the results to the console
    console.log(listItems);
  });
  res.send("Scraped")
});