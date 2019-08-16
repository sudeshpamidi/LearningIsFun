"use strict"

let courseLabels = {
    CourseId: "Course Id:",
    Title: "Title:",
    Category: "Category:",
    Location: "Location:",
    StartDate: "Start Date:",
    EndDate: "End Date:",
    Fee: "Fee:",
    Meets: "Time:"
};

$(document).ready(function() {
    let urlParams = new URLSearchParams(location.search);
    let courseId = urlParams.get("id");

    $("#register").prop("href", "register.html?id=" + courseId)
    displayCourse(courseId);

    $("#cancel").on('click', function() {
        window.history.back();
    });

    function displayCourse(courseId) {
        let url = "/api/courses/" + courseId;
        $.get(url, function(data) {
            let course = JSON.parse(data);
            console.log(course);
            Object.keys(courseLabels).forEach(function(key, i) {
                let markup = "<tr><th>" + courseLabels[key] + "</th><td>" + course[key] + "</td><tr>"
                $("#tbody").append(markup);
            });

            if (course.Students.length > 0) {
                $(".students").toggle();
                addRowHeader();
                addToTable(course.Students);
            }

            $("#tableCourse").addClass = "table-striped"

        });
    };


    function addToTable(students) {
        console.log(students);
        students.forEach(function(e) {
            let markup = "<tr><td>" + e.StudentName + "</td><td>" + e.Email + "</td></tr>";
            $("#tableStudents").append(markup);
        });
    };

    function clearResults(table) {
        table.empty();
    }

    function addRowHeader() {
        let markup = "<tr><th>Student Name</th><th>Email</th></tr>"
        $("#tableStudents").append(markup)
    }

});