$(document).ready(function () {

    /* Create variables to Dom needed DOM elements */
    let $scrapeTerm = $("#scrapeTerm");
    let $scrapeButton = $("#scrapeButton");
    let $searchTerm = $("#searchTerm");
    let $searchButton = $("#searchButton");
    let $getAllButton = $("#getAllButton");
    let $tableDiv = $("#tableDiv");

    /* Create API object to make AJAX calls */
    let searchAPI = {

        getAll: function () {
            return $.ajax({
                url: "/scrape",
                type: "GET"
            });
        },

        searchTerm: function (term) {
            return $.ajax({
                url: "/api/all" + term,
                type: "GET"
            });
        },

        scrapeTerm: function (term) {
            return $.ajax({
                url: "/api/all" + term,
                type: "POST"
            });
        }

    };


    /* Functions called by Event Listeners */
    let handleScrapeSubmit = function (event) {
        event.preventDefault();

        let searchTerm = $scrapeTerm.val().trim();

        searchAPI.scrapeTerm(searchTerm).then(function (resp) {

            let data = prepareResponseForTable(resp);
            makeTable($tableDiv, data);
        });

        // Clear out scrape field
        $scrapeTerm.val("");
    };


    let handleSearchSubmit = function (event) {

        let searchTerm = $searchTerm.val().trim();

        searchAPI.searchTerm(searchTerm).then(function (resp) {

            let data = prepareResponseForTable(resp);
            makeTable($tableDiv, data);
        });

        // Clear out search field
        $searchTerm.val("");
    };

    let handleGetAll = function (event) {

        searchAPI.getAll()
        .then(function(resp) {
            let data = prepareResponseForTable(resp);
            makeTable($tableDiv, data);

        })
        .catch(function(err) {
            console.log(err);
        });

    };

   
    /* Utilities */

    function makeTable(container, data) {
        let table = $("<table/>").addClass('table table-striped');
        $.each(data, function (rowIndex, r) {

            let row = $("<tr/>");
            $.each(r, function (colIndex, c) {
                row.append($("<t" + (rowIndex == 0 ? "h" : "d") + "/>").text(c));
            });
            table.append(row);
        });
        return container.html(table);
    }

    //  Utility to take a response filled with story and make it into an array of arrays that is in a format ready for our "makeTable" utility.
    function prepareResponseForTable(response) {
        let data = [];
        data[0] = ["title"]; // Row header ( Add more columns if needed )

        response.forEach(function (eachStory) {
            //   data.push([eachStory._id, eachStory.story, eachStory.link, eachStory._v]);
            data.push([eachStory.story]);
        });

        return data; // Returns an array of arrays for "makeTable"
    }



    /* Event Listeners */
    $scrapeButton.on("click", handleScrapeSubmit);
    $searchButton.on("click", handleSearchSubmit);
    $getAllButton.on("click", handleGetAll);
});
