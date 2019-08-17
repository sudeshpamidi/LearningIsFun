/** 
 * Dicription: This script contains supporting functions for courses.html
 * Author : Sudesh Pamidi
 */
"use strict"

/**
 * These are custome labels mapping to the json fields.
 */
let courseLabels = {
    CourseId: "Course Id:",
    Title: "Title:",
    Category: "Category:",
    Location: "Location:",
    StartDate: "Start Date:",
    EndDate: "End Date:",
    Fee: "Fee:",
    Meets: "Time:",
    Students: "No of Students:"
};

$(document).ready(function() {
    let urlParams = new URLSearchParams(location.search);
    let courseId = urlParams.get("id");

    $("#register").prop("href", "register.html?id=" + courseId)
    displayCourse(courseId);

    $("#cancel").on('click', function() {
        window.history.back();
    });

    /**
     * This function makes a call to restful services and gets the course information and 
     * display in the tbody element.
     * @param {string} courseId  -- Course Id
     */
    function displayCourse(courseId) {
        let url = "/api/courses/" + courseId;
        $.get(url, function(data) {
            let course = JSON.parse(data);
            console.log(course);
            Object.keys(courseLabels).forEach(function(key, i) {
                let markup
                if (key == "Students") {
                    markup = "<tr><th>" + courseLabels[key] + "</th><td>" + course[key].length + "</td><tr>"
                } else {
                    markup = "<tr><th>" + courseLabels[key] + "</th><td>" + course[key] + "</td><tr>"
                }

                $("#tbody").append(markup);
            });

            if (course.Students.length > 0) {
                $(".students").toggle();
                addRowHeader();
                addToTable(course.Students);
            }

            $("#tableCourse").addClass("table-striped");

        });
    };

    /**
     * Display the students information in the table rows.
     * @param {object} students 
     */
    function addToTable(students) {
        console.log(students);
        students.forEach(function(e) {
            let markup = "<tr><td>" + e.StudentName + "</td><td>" + e.Email + "</td></tr>";
            $("#tableStudents").append(markup);
        });
    };

    /**
     * clears the table content. 
     * @param {string} table 
     * This function is not been utilized. Need to refactor.
     */
    function clearResults(table) {
        table.empty();
    }

    /**
     * add the row header to the student table.
     */
    function addRowHeader() {
        let markup = "<tr><th>Student Name</th><th>Email</th></tr>"
        $("#tableStudents").append(markup)
    }

});