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
    var allCategoriesUrl = "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";
    var categoriesTitleHtml = "https://bigdave7.github.io/coursera-test/module5/snippets/categories-title-snippet.html";
    var categoryHtml = "https://bigdave7.github.io/coursera-test/module5/snippets/category-snippet.html";
    var menuItemsUrl = "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/";
    var menuItemsTitleHtml = "https://bigdave7.github.io/coursera-test/module5/snippets/menu-item-title.html";
    var menuItemHtml = "https://bigdave7.github.io/coursera-test/module5/snippets/menu-item.html";

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

    var switchMenuToActive = function () {
        var classes = document.querySelector("#navHomeButton").className;
        classes = classes.replace(new RegExp("nav-hovered", "g"), "");
        document.querySelector("#navHomeButton").className = classes;

        classes = document.querySelector("#navMenuButton").className;
        if (classes.indexOf("nav-hovered") == -1) {
            classes += " nav-hovered";
            document.querySelector("#navMenuButton").className = classes;
        }
    }

    document.addEventListener("DOMContentLoaded", function (event) {
        // TODO: STEP 0: Look over the code from
        // *** start ***
        // to
        // *** finish ***
        // below.
        // We changed this code to retrieve all categories from the server instead of
        // simply requesting home HTML snippet. We now also have another function
        // called buildAndShowHomeHTML that will receive all the categories from the server
        // and process them: choose random category, retrieve home HTML snippet, insert that
        // random category into the home HTML snippet, and then insert that snippet into our
        // main page (index.html).
        //
        // TODO: STEP 1: Substitute [...] below with the *value* of the function buildAndShowHomeHTML,
        // so it can be called when server responds with the categories data.

        // *** start ***
        // On first load, show home view
        showLoading("#main-content");
        $.get(allCategoriesUrl, buildAndShowHomeHTML, "json"); // Explicitly setting the flag to get JSON from server processed into an object literal
    });
        // *** finish **

    // Builds HTML for the home page based on categories array
    // returned from the server.
    function buildAndShowHomeHTML (categories) {

        // Load home snippet page
        $.get(homeHtml, function (homeHtml) {
            var chosenCategoryShortName = chooseRandomCategory(categories);
            var homeHtmlToInsertIntoMainPage = "'" + chosenCategoryShortName + "'";
            homeHtml = insertProperty(homeHtml, "randomCategoryShortName", homeHtmlToInsertIntoMainPage);
            insertHtml("#main-content", homeHtml);
    
            // TODO: STEP 2: Here, call chooseRandomCategory, passing it retrieved 'categories'
            // Pay attention to what type of data that function returns vs what the chosenCategoryShortName
            // variable's name implies it expects.
            // var chosenCategoryShortName = ....
    
            // TODO: STEP 3: Substitute {{randomCategoryShortName}} in the home html snippet with the
            // chosen category from STEP 2. Use existing insertProperty function for that purpose.
            // Look through this code for an example of how to do use the insertProperty function.
            // WARNING! You are inserting something that will have to result in a valid Javascript
            // syntax because the substitution of {{randomCategoryShortName}} becomes an argument
            // being passed into the $dc.loadMenuItems function. Think about what that argument needs
            // to look like. For example, a valid call would look something like this:
            // $dc.loadMenuItems('L')
            // Hint: you need to surround the chosen category short name with something before inserting
            // it into the home html snippet.
            //
            // var homeHtmlToInsertIntoMainPage = ....
    
            // TODO: STEP 4: Insert the produced HTML in STEP 3 into the main page
            // Use the existing insertHtml function for that purpose. Look through this code for an example
            // of how to do that.
            // ....
    
        }
        ); // False here because we are getting just regular HTML from the server, so no need to process JSON.
    }
    
    // Given array of category objects, returns a random category object.
    function chooseRandomCategory (categories) {
        // Choose a random index into the array (from 0 inclusively until array length (exclusively))
        var randomArrayIndex = Math.floor(Math.random() * categories.length);
    
        // return category object with that randomArrayIndex
        return categories[randomArrayIndex];
    }
    
    dc.loadMenuCategories = function () {
        showLoading("#main-content");
        $.get(allCategoriesUrl, buildAndShowCategoriesHTML);
    }

    dc.loadMenuItems = function (categoryShort) {
        showLoading("#main-content");
        $.get(menuItemsUrl + categoryShort + ".json", buildAndShowMenuItemsHTML);
    }

    function buildAndShowCategoriesHTML (categories) {
        $.get(categoriesTitleHtml, function (categoriesTitleHtml) {
            $.get(categoryHtml, function (categoryHtml) {
                switchMenuToActive();

                var categoriesViewHtml = buildCategoriesViewHtml(categories, categoriesTitleHtml, categoryHtml);
                insertHtml("#main-content", categoriesViewHtml);
            });
        });
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

    function buildAndShowMenuItemsHTML (categoryMenuItems) {
        $.get(menuItemsTitleHtml, function (menuItemsTitleHtml) {
            $.get(menuItemHtml, function(menuItemHtml) {
                switchMenuToActive();
                
                var menuItemsViewHtml = buildMenuItemsViewHtml(categoryMenuItems, menuItemsTitleHtml, menuItemHtml);
                insertHtml("#main-content", menuItemsViewHtml);
            });
        });
    }

    function buildMenuItemsViewHtml(categoryMenuItems, menuItemsTitleHtml, menuItemHtml) {
        menuItemsTitleHtml = insertProperty(menuItemsTitleHtml, "name", categoryMenuItems.category.name);
        menuItemsTitleHtml = insertProperty(menuItemsTitleHtml, "special_instructions", categoryMenuItems.category.special_instructions);

        var finalHtml = menuItemsTitleHtml;
        finalHtml += "<section class='row'>";

        var menuItems = categoryMenuItems.menu_items;
        var catShortName = categoryMenuItems.category.short_name;
        for (var i = 0; i < menuItems.length; i++) {
            var html = menuItemHtml;
            html = insertProperty(html, "short_name", menuItems[i].short_name);
            html = insertProperty(html, "catShortName", catShortName);
            html = insertItemPrice(html, "price_small", menuItems[i].price_small);
            html = insertItemPortionName(html, "small_portion_name", menuItems[i].small_portion_name);
            html = insertItemPrice(html, "price_large", menuItems[i].price_large);
            html = insertItemPortionName(html, "large_portion_name", menuItems[i].large_portion_name);
            html = insertProperty(html, "name", menuItems[i].name);
            html = insertProperty(html, "description", menuItems[i].description);
            
            finalHtml += html;
        }
        finalHtml += "</section>";
        return finalHtml;
    }
    
    function insertItemPrice(html, pricePropName, priceValue) {
        if (!priceValue) {
            return insertProperty(html, pricePropName, "");
        }
        priceValue = "$" + priceValue.toFixed(2);
        html = insertProperty(html, pricePropName, priceValue);
        return html;
    }

    function insertItemPortionName(html, portionPropName, portionValue) {
        if (!portionValue) {
            return insertProperty(html, portionPropName, "");
        }
        portionValue = "(" + portionValue + ")";
        html = insertProperty(html, portionPropName, portionValue);
        return html;
    }

    global.$dc = dc;

})(window);