// // store details here
// let scraper = [{
    
// }
// ];
// //line below exports the module
// module.exports = scraper;
var mongoose = require("mongoose")
var Schema = mongoose.Schema

var ScraperSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String
})

var Scraper = mongoose.model("Scraper", ScraperSchema)

module.exports = Scraper;