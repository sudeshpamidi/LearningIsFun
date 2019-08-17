/** 
 * Dicription: This script contains supporting functions for register.html
 * Author : Sudesh Pamidi
 *
 */
"use strict"
$(document).ready(function() {

    let urlParams = new URLSearchParams(location.search);
    let courseId = urlParams.get("id");


    $("#courseid").val(courseId);

    /**
     * register button click event.
     */
    $("#register").click(function() {

        if (!validator.validate('frmRegister')) {
            return;
        };

        let postData = $("#frmRegister").serialize();
        let url = "/api/register";
        $.post(url, postData, function(data) {
            $("#msg").toggle();
            $("#msg").html("Student Name:" + $("#studentname").val() + " successfully registered to the course: " + $("#courseid").val());
            $("#register").prop("disabled", true);
            $("#cancel").text("OK");
        });
    });

    $("#cancel").on('click', function() {
        window.history.back();
    });

    /**
     * Validation utility, validates the form elements and popover the message.
     */
    var ValidationUtility = function() {
        var elements, elementCount;
        elements = $('[data-role="validate"]'),
            elementCount = 0;

        elements.popover({
            placement: 'top'
        });

        elements.on('invalid', function() {
            if (elementCount === 0) {
                //$('#' + this.id).popover('show');
                $(this).popover('show');
                elementCount++;
            }
        });

        elements.on('blur', function() {
            $(this).popover('hide');
        });

        var validate = function(formSelector) {
            elementCount = 0;

            if (formSelector.indexOf('#') === -1) {
                formSelector = '#' + formSelector;
            }

            return $(formSelector)[0].checkValidity();
        };

        return {
            validate: validate
        };
    };

    var validator = new ValidationUtility();
});