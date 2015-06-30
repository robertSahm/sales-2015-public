/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function () {

        var $postContent = $(".post-content");
        $postContent.fitVids();

        $(".scroll-down").arctic_scroll();

        $(".menu-button, .nav-cover, .nav-close").on("click", function(e){
            e.preventDefault();
            $("body").toggleClass("nav-opened nav-closed");
        });

    });

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function (options) {

        var defaults = {
            elem: $(this),
            speed: 500
        },

        allOptions = $.extend(defaults, options);

        allOptions.elem.click(function (event) {
            event.preventDefault();
            var $this = $(this),
                $htmlBody = $('html, body'),
                offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
                position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
                toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
            }
        });

    };
})(jQuery);



//////////////////////

(function($, window, document, undefined) {

	'use strict';

	$(function() {

		$(window).scroll(function (e) {
    		var scroll = $(window).scrollTop();
		    	if (scroll > 0) {
		    		$('.nav-desktop').addClass('scrolled')
		    	} else {
		    		$('.nav-desktop').removeClass('scrolled')
		    	};
		});
		
		// Nav Dropdown 
		$('li.nav-dropper').hover(function(e) {
			$('ul.nav-dropdown', this).stop(true, false).slideToggle(200);
			 e.preventDefault();
		});

		// Nav call to action dropdown

		// $('.button-cta-nav').click(function(e) {
		// 	$('.cta-form').show();
		// 	var container = $('.cta-form');

		// 	if (!container.is(e.target) // if the target of the click isn't the container...
		// 		 && container.has(e.target).length === 0) // ... nor a descendant of the container
		// 	{
		// 		container.hide();
		// 	}
		// });




		$('.button-cta-nav').click( function() {
			$('.cta-form').show();
			$('.nav-desktop').addClass('cover-all');
			
			// $('.cover-all').click( function() {
			// 	console.log('clicked cover all');
			// 	$('.nav-desktop').toggleClass('cover-all');
			// 	// $('.cta-form').hide();
			// });
		 	
		});
		
	});
	



})(jQuery, window, document);



