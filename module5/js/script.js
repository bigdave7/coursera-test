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
    var allCategoriesUrl = "";
    var categoriesTitleHtml = "https://bigdave7.github.io/coursera-test/module5/snippets/categories-title-snippet.html";
    var categoryHtml = "https://bigdave7.github.io/coursera-test/module5/snippets/category-snippet.html";

    var insertHtml = function (selector, html) {
        var targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    };

    var showLoading = function (selector) {
        var html = "<div class='text-center'>";
        html += "<img src='images/ajax-loader.gif'><div>";
        insertHtml(selector, html);
    };

    var insertProperty = function (string, propName, propValue) {
        var propToReplace = "{{" + propName + "}}";
        string = string.replace(new RegExp(propToReplace, "g"), propValue);
        return string;
    }

    document.addEventListener("DOMContentLoaded", function (event) {
        showLoading("#main-content");
        $.get(homeHtml, function (responseText) {
            document.querySelector("#main-content").innerHTML = responseText;
        }, "html");
    });

    dc.loadMenuCategories = function () {
        showLoading("#main-content");
        $.get(allCategoriesUrl, buildAndShowCategoriesHTML, "json");
    }

    function buildAndShowCategoriesHTML (categories) {
        $.get(categoriesTitleHtml, function (categoriesTitleHtml) {
            $.get(categoryHtml, function (categoryHtml) {
                var categoriesViewHtml = buildAndShowCategoriesHTML(categories, categoriesTitleHtml, categoryHtml);
                insertHtml("#main-content", categoriesViewHtml);
            }, "html");
        }, "html");
    }

    function buildCategoriesViewHtml(categories, categoriesTitleHtml, categoryHtml) {
        var finalHtml = categoriesTitleHtml;
        finalHtml += "<section class='row'>";

        for (var i = 0; i < categories.length; i++) {
            var html = categoryHtml;
            var name = "" + categories[i].name;
            var short_name = categories[i].short_name;
            html = insertProperty(html, "name", name);
            html = insertProperty(html, "short_name", short_name);
            finalHtml += html;
        }
        finalHtml += "</section>";
        return finalHtml;
    }

    global.$dc = dc;

})(window);