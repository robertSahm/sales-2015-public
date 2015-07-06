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

		$('.button-cta-nav').click( function() {
			$('.cta-form').show();
			$('.nav-desktop').addClass('cover-all');
		});
	});

	$(function() {

    	$('#cta-submit').click(function(e) {
	 		var data = {}

			e.preventDefault(); //prevent form from submitting
	    	
	    	$('#cta-form-post :input').each(function(i, e) { 
	    		data[$(e).attr('id')] = $(e).val();
	    	});
    		console.log(data);
	  
	      var request = $.ajax({
	         url:  '',
	         // url:  'http://10.20.3.1:8400/api/salesRegistration',
	         type: 'POST',
	         dataType: 'JSON',
	         async: true,
	         data: data
	      }).done(function(data) {
	         console.log('done');
	      }).fail(function(xhr, status, err) {
	      	console.log('failed');
	      });
    	});
	});

})(jQuery, window, document);

