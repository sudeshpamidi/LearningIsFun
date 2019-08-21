"use strict"
$(document).ready(function() {

    fillDropDown($("#category"));

    let found = false;
    let urlParams = new URLSearchParams(location.search);
    let courseId = urlParams.get("id");

    $("#courseid").popover({
        trigger: 'manual',
        placement: 'right',
        content: "Course is already exist. It will be edited."
    });

    if (courseId != '') {
        getCourse(courseId);
    }

    $("#courseid").on({
        //blur: function() {
        //    getCourse($(this).val().trim());
        //},
        keyup: function() {
            getCourse($(this).val().trim());
        }
    });

    $("#save").click(function() {
        if (!validator.validate("#frmCourse")) {
            return;
        }
        let postData = $("#frmCourse").serialize();
        let url = "/api/courses",
            type = ($(this).html() == "Edit Course" ? "PUT" : "POST");

        console.log("postData : " + postData);
        $.ajax({
                url: url,
                type: type,
                data: postData
            })
            .done(function() {
                displayMessage("Course has been added/edited.");
                $("#save, h2").html("Edit Course");
            })
            .fail(function() {
                console.log('Opps.. something went wrong in while creating the course.');
            });

    });


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
     * display the success message, 
     * disable the register button 
     * and change the text from Cancel to OK
     */
    function displayMessage(message) {
        $("#msg").toggle();
        $("#msg").html(message);
    }

    /**
     * This function makes a call to restful services and gets the course information and 
     * display in the tbody element.
     * @param {string} courseId  -- Course Id
     */
    function getCourse(courseId) {
        let url = "/api/courses/" + courseId;
        $.getJSON(url, function(data) {
                populateFields(data);
            })
            .fail(function() {
                $("#courseid").popover("hide");
            })
            .done(function() {
                //$("#save").html("Edit Course");
            });
    };

    /**
     * 
     * @param {*} course 
     */
    function populateFields(course) {

        if (course != undefined) {
            $("#courseid").val(course["CourseId"]);
            $("#courseid").popover("show");

            $("#title").val(course["Title"]);
            $("#category option:contains(" + course["Category"] + ")").attr('selected', 'selected');
            $("#location").val(course["Location"]);
            $("#startdate").val(course["StartDate"]);
            $("#enddate").val(course["EndDate"]);
            $("#fee").val(course["Fee"]);
            $("#meets").val(course["Meets"]);

            $("#save, h2").html("Edit Course");

        } else {
            $("#courseid").popover("hide");
            $("#save").html("Add Course");
            $("h2").html("New Course");
        }

    }

    var ValidationUtility = function() {
        let elements = $('[data-role="validate"]');
        let elementCount = 0;

        elements.popover({
            trigger: 'focus',
            placement: 'right',
            content: "Course is already exist. It will be edited."
        });

        var validate = function(formSelector) {
            elementCount = 0;
            if (formSelector.indexOf('#') === -1) {
                formSelector = '#' + formSelector;
            }
            return $(formSelector)[0].checkValidity();
        };

        elements.on('invalid', function() {
            if (elementCount === 0) {
                $(this).popover('show');
                elementCount++;
            }
        });

        return {
            validate: validate // expose outside to utilize
        };

    };
    var validator = new ValidationUtility();


});