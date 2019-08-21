/** 
 * Dicription: This script contains supporting functions for courses.html
 * Author : Sudesh Pamidi
 */
"use strict"

$(document).ready(function() {

    fillDropDown($("#course"));

    displayCoursesByCategory("all");

    $("#course").on("change", displayCourses);

    /**
     * Display the course information in the table.
     */
    function displayCourses() {
        clearResults($("#tableCourses"));
        displayCoursesByCategory($("#course").val());
        $("#tableCourses").addClass("table-striped"); //not working need to look into it
    }

    /**
     * Display all the courses 
     * This function is not utilized. 
     */
    function displayAllCourses() {
        let url = "/api/courses";
        $.get(url, function(json) {
            let courses = JSON.parse(json);
            addRowHeader();
            addToTable(courses);
        });
    };

    /**
     * Display the course information by category. 
     * all -- provides all the courses.
     * @param {string} category 
     */
    function displayCoursesByCategory(category) {

        let url = "/api/courses/bycategory/" + category;
        if (category == "all") {
            url = "/api/courses";
        };

        $.getJSON(url, function(courses) {
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

    /**
     * Display course information in the table -#tableCourses
     * @param {object} data  -- Courses object from Restfull services
     */
    function addToTable(data) {
        data.forEach(function(e) {
            let url = `<span>
                        <a href='details.html?id=${e.CourseId}'><i class='fas fa-info-circle fa-lg' title='Details' data-toggle='tooltip'></i></a>
                        <a class='edit mr-2' title='Edit' data-toggle='tooltip' href='course.html?id=${e.CourseId}&edit=true'><i class='fa fa-pencil fa-lg' aria-hidden='true'></i></a>
                    </span>`
            let markup = "<tr><td>" + e.Title + "</td><td>" + e.StartDate + "</td><td>" + e.Location + "</td><td>" + url + "</td></tr>";
            $("#tableCourses").append(markup);
        });
    };

    /**
     * clears the table information.
     * @param {*} table 
     */
    function clearResults(table) {
        table.empty();
    }

    /**
     * creating header in the table
     */
    function addRowHeader() {
        let markup = "<tr><th>Title</th><th>Start Date</th><th>Location</th><th>Details</th></tr>";
        $("#tableCourses").append(markup)
    }
});