$(document).ready(function() {

    fillDropDown($("#category"));

    let found = false;
    let urlParams = new URLSearchParams(location.search);
    let courseId = urlParams.get("id");

    if (courseId != '') {
        getCourse(courseId);
    }

    $("#courseid").blur(function() {
        getCourse($("#courseid").val().trim());
    })

    $("#edit").click(function() {
        let postData = $("#frmRegister").serialize();
        let url = "/api/courses",
            type = (found ? "PUT" : "POST");
        alert(type);
        $.ajax({
                url: url,
                type: type,
                data: postData
            })
            .done(function() {
                displayMessage("Course has been added/edited.");
            })
            .fail(function() {
                console.log('Opps.. something went wrong in while creating the course.');
            });

    });

    $("#add").click(function() {
        let postData = $("#frmRegister").serialize();
        let url = "/api/courses";
        $.post(url, postData, function(data) {
                console.log('Course added');
            })
            .done(function() {
                displayMessage("Course has been added");
                console.log('Course added');
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
                console.log("Something went wrong");
            })
            .done(function() {
                found = true;
            });
    };

    function populateFields(course) {
        $("#courseid").val(course["CourseId"]);
        $("#title").val(course["Title"]);
        $("#category").val(course["Category"]);
        $("#location").val(course["Location"]);
        $("#startdate").val(course["StartDate"]);
        $("#enddate").val(course["EndDate"]);
        $("#fee").val(course["Fee"]);
        $("#meets").val(course["Meets"]);
    }

});