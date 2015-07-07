/**
* Main JS
*/


/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    // The template code
    var templateSource = document.getElementById('results-template').innerHTML;
     
    // compile the template
    var template = Handlebars.compile(templateSource);
     
    // The div/container that we are going to display the results in
    var resultsPlaceholder = document.getElementById('results');
     
    var data = {
        "person": {
            "name": "Handlebars",
            "last": "Demo"
        }
    };
     
    resultsPlaceholder.innerHTML = template(data);

})(jQuery);


