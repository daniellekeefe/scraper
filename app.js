var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Configure middleware
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));

// Simple index route
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "./public/index.html"));
});

// Start the server
app.listen(PORT, function() {
  console.log("App listening on port " + PORT);

  axios.get("https://idioms.thefreedictionary.com/light").then(function(response) {
   
    var $ = cheerio.load(response.data);

    var idioms = [];
    var links = [];
    var listItems = $("ul.idiKw li a").each(function(i, elem) {
        idioms.push($(elem).text());
        links.push("https://thefreedictionary.com/" + $(elem).attr("href"));
    });

    console.log(idioms);
    console.log(links);
});
});