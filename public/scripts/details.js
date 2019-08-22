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
        // if (edit == 'true') {
        //     displayCourseEditMode(courseId)
        // } else 

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
            $.each(courseLabels, function(key, val) {
                let markup
                if (key == "Students") {
                    markup = "<tr><th>" + val + "</th><td>" + course[key].length + "</td></tr>"
                } else {
                    markup = "<tr><th>" + val + "</th><td>" + course[key] + "</td></tr>"
                }
                $("#tbody").append(markup);
            });

            if (course.Students.length > 0) {
                $(".students").toggle();
                addRowHeader();
                addToTable(course.Students);
            }
        });
        // $("#tableCourse").addClass("table-striped");
    };

    /**
     * Display the students information in the table rows.
     * @param {object} students 
     */
    function addToTable(students) {
        students.forEach(function(e) {

            let buttons = `<td><span>
                <a class="save mr-2" title="Save" data-toggle="tooltip">
                <i class="fas fa-save fa-lg"></i></a>
                <a class="cancel mr-2" title="Cancel" data-toggle="tooltip">                
                <i class="fas fa-undo fa-lg" aria-hidden="true"></i>
                </a>
                <a class="edit mr-2" title="Edit" data-toggle="tooltip">
                <i class="fa fa-pencil fa-lg" aria-hidden="true"></i>
                </a>
                <a class="delete" title="Unregister" data-toggle="modal" data-target="#exampleModal">                
                <i class="fas fa-user-minus fa-lg" aria-hidden="true"></i>
                </a></span>
                </td>`;

            let markup = `<tr><td>${e.StudentName}</td><td>${e.Email}</td>${buttons}</tr>`;

            $("#tableStudents").append(markup);

        });

        /** edit event handling */
        $(".edit").on("click", function() {
            $(this).parents("tr").find("td:not(:last-child)").each(function() {
                $(this).html('<input type="text" class="form-control inputcontrol" value="' + $(this).text() + '">');
            });
            $(this).parents("tr").find(".cancel, .save, .edit").toggle();
        });

        /** Delete event handling */
        $(".delete").on("click", function() {
            /*
            var input = $(this).parents("tr").find(".inputcontrol");
            input.each(function() {
                $(this).parent("td").html($(this).val());
                console.log($(this));
                alert($(this));
            });
            */
            let row = $(this);

            let postData = "courseid=" + courseId;
            $(this).parents("tr").find("td:not(:last-child)").each(function(key, value) {
                if (key == "0")
                    postData = postData + "&studentname=" + $(this).text();
                else
                    postData = postData + "&email=" + $(this).text();
            });

            $("#btnConfirm").on('click', function() {
                console.log(postData);
                let url = "/api/unregister";
                $.ajax({
                        url: url,
                        type: "POST",
                        data: postData
                    })
                    .done(function() {
                        //$(this).parents("tr").remove();
                        row.parents("tr").remove();
                    });
                //$(this).parents("tr").remove();
                //$.modal.close();
                $("#exampleModal").modal('hide');
            });




        });

        $(".save").on("click", function() {
            var valid = false;
            var input = $(this).parents("tr").find(".inputcontrol");


            //Validate the control's data.
            input.each(function() {
                if (!$(this).val()) {
                    $(this).addClass("error");
                    valid = true;
                } else {
                    $(this).removeClass("error");
                }
            });
            $(this).parents("tr").find(".error").first().focus();

            if (!valid) {
                input.each(function() {
                    $(this).parent("td").html($(this).val());
                });
                $(this).parents("tr").find(".cancel, .save, .edit").toggle();
            }


        });

        $(".cancel").on("click", function() {
            var input = $(this).parents("tr").find(".inputcontrol");
            input.each(function() {
                $(this).parent("td").html($(this).val());
            });
            $(this).parents("tr").find(".cancel, .save, .edit").toggle();
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
        let markup = "<tr><th>Student Name</th><th>Email</th><th>Edit/Unregister</th></tr>"
        $("#tableStudents").append(markup)
    }

});