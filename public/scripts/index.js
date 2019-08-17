"use strict"
$(function() {

    $("#today").html(new Date().toDateString() + "| 79° F")

    $("#img1").on({
        mouseover: function() {
            $(this).attr("src", "images/rank1-hover-02.png");
        },
        mouseout: function() {
            $(this).attr("src", "images/rank1-02.png");
        },
        focus: function() {
            $(this).attr("src", "images/rank1-hover-02.png");
        },
        blur: function() {
            $(this).attr("src", "images/rank1-02.png");
        }
    });


    $("#img2").on({
        mouseover: function() {
            $(this).attr("src", "images/infographic-hover-01.png");
        },
        mouseout: function() {
            $(this).attr("src", "images/infographic-01.png");
        },
        focus: function() {
            $(this).attr("src", "images/infographic-hover-01.png");
        },
        blur: function() {
            $(this).attr("src", "images/infographic-01.png");
        }
    });


    $("#img3").on({
        mouseover: function() {
            $(this).attr("src", "images/infographic-hover-03.png");
        },
        mouseout: function() {
            $(this).attr("src", "images/infographic-03.png");
        },
        focus: function() {
            $(this).attr("src", "images/infographic-hover-03.png");
        },
        blur: function() {
            $(this).attr("src", "images/infographic-03.png");
        }
    });
    $("#img4").on({
        mouseover: function() {
            $(this).attr("src", "images/infographic-hover-04.png");
        },
        mouseout: function() {
            $(this).attr("src", "images/infographic-04.png");
        },
        focus: function() {
            $(this).attr("src", "images/infographic-hover-04.png");
        },
        blur: function() {
            $(this).attr("src", "images/infographic-04.png");
        }
    });


});