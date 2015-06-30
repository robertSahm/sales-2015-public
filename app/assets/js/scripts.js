/*!
 * Lucera
 * 
 * 
 * @author 
 * @version 1.0.3
 * Copyright 2015. MIT licensed.
 */
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


