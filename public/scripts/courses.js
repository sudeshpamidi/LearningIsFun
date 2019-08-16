"use strict"

$(document).ready(function() {

    fillDropDown($("#course"));

    displayCoursesByCategory("all");

    $("#course").on("change", displayCourses);

    function displayCourses() {
        clearResults($("#tableCourses"));
        displayCoursesByCategory($("#course").val());
    }

    function displayAllCourses() {
        let url = "/api/courses";
        $.get(url, function(json) {
            let courses = JSON.parse(json);
            addRowHeader();
            addToTable(courses);
        });
    };


    function displayCoursesByCategory(category) {

        let url = "/api/courses/bycategory/" + category;
        if (category == "all") {
            url = "/api/courses";
        };

        $.get(url, function(json) {
            let courses = JSON.parse(json);
            addRowHeader();
            addToTable(courses);
        });
    };


    /**
     * This is to fill the dropDown with the data in array of elements.
     * @param {*} dropdown  -- dropdown name 
     * @param {*} obj       -- javascript object
     */
    function fillDropDown(dropdown) {
        let url = "/api/categories";
        $.get(url, function(data) {
            let categories = JSON.parse(data);
            categories.forEach(function(e) {
                let option = new $("<option>", { value: e.Value, text: e.Category })
                dropdown.append(option);
            });
        });
    };

    function addToTable(data) {
        data.forEach(function(e) {
            let url = "<a href='details.html?id=" + e.CourseId + "'>Details</a>";
            let markup = "<tr><td>" + e.Title + "</td><td>" + e.StartDate + "</td><td>" + e.Location + "</td><td>" + url + "</td></tr>";
            $("#tableCourses").append(markup);
        });

    };

    function clearResults(table) {
        table.empty();
    }

    function addRowHeader() { //(table, product) {
        let markup = "<tr><th>Title #</th><th>StartDate</th><th>Location</th><th>Details</th></tr>"
        $("#tableCourses").append(markup)
    }
});