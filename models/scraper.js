// // store details here
// let scraper = [{
    
// }
// ];
// //line below exports the module
// module.exports = scraper;
let mongoose = require("mongoose")
let Schema = mongoose.Schema

let ScraperSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String
})

let Scraper = mongoose.model("Scraper", ScraperSchema)

module.exports = Scraper;