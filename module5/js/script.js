$(function () {
    $("#navbarToggle").blur(function (event) {
        var screenWidth = window.innerWidth;
        if (screenWidth < 768) {
            $("#navbarNav").collapse('hide');
        }
    });
});

(function (global) {
    var dc = {};
    var homeHtml = "https://bigdave7.github.io/coursera-test/module5/snippets/home-snippet.html";

    var insertHtml = function (selector, html) {
        var targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    };

    var showLoading = function (selector) {
        var html = "<div class='text-center'>";
        html += "<img src='images/ajax-loader.gif'><div>";
        insertHtml(selector, html);
    };

    document.addEventListener("DOMContentLoaded", function (event) {
        showLoading("#main-content");
        $.ajax({
            url: homeHtml,
            type: 'GET',
            success: function(responseText) {
              document.querySelector("#main-content").innerHTML = responseText;
            }
          });
    });

    global.$dc = dc;

})(window);