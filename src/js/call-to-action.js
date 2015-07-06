(function($, window, document, undefined) {

	'use strict';

	$(function() {
		var modal = $('.nav-desktop');

		$(window).scroll(function (e) {
    		var scroll = $(window).scrollTop();
		   
		   if (scroll > 0) {
		   	modal.addClass('scrolled')
		   } else {
		   	modal.removeClass('scrolled')
		   };
		});
		
		// Nav Dropdown 
		$('li.nav-dropper').hover(function(e) {
			$('ul.nav-dropdown', this).stop(true, false).slideToggle(200);
			 e.preventDefault();
		});

		$('.button-cta-nav').click( function() {
			$('.cta-form').show();
			modal.addClass('cover-all');
			setTimeout(function() {
				modal.click(function(e) {
					e.preventDefault();
					if (/cover-all/.test(modal.attr('class'))) {
						$('.cta-form').hide();
						modal.removeClass('cover-all');
						modal.off('click');
					}
				});
			}, 1);
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
	         url:  'http://localhost:1437/api/salesRegistration',
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

