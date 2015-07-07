(function($, window, document, undefined) {

	'use strict';

	//////////////////////
	// Nav dropdown 
	//////////////////////
	
	$(function() {
		var modal = $('.nav-desktop'),
			 form = $('.cta-form');

		$('li.nav-dropper').hover(function(e) {
			$('ul.nav-dropdown', this).stop(true, false).slideToggle(200);
			 e.preventDefault();
		});

		$('.button-cta-nav').click( function() {
			form.show();
			setTimeout(function() {
				form.click(function(e) {
					e.preventDefault();
				});
			}, 1);
			modal.addClass('cover-all');
			setTimeout(function() {
				modal.click(function(e) {
					e.preventDefault();
					var el = $(e.target),
						elForm = el.closest('.cta-form'),
						inForm = elForm.length > 0;

					if (!inForm && /cover-all/.test(modal.attr('class'))) {
						$('.cta-form').hide();
						modal.removeClass('cover-all');
						modal.off('click');
					}
				});
			}, 1);
		});
	});


	//////////////////////////
	// Form data dump
	//////////////////////////

	$(function() {

    	$('#cta-submit').click(function(e) {
	 		var data = {}

			e.preventDefault(); //prevent form from submitting
	    	
	    	$('#cta-form-post :input').each(function(i, e) { 
	    		data[$(e).attr('id')] = $(e).val();
	    	});

    		console.log(data);

    		var emailRegex = /^[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,4}$/i,
             emailCheck = emailRegex.test(data['cta-input-email']),
             emailError = 'Enter a valid Email.',
             firstnameCheck = data['cta-input-first-name'].length > 0,
             firstnameError = 'Enter a first name.',
             lastnameCheck = data['cta-input-last-name'].length > 0,
             lastnameError = 'Enter a last name.',
             companyCheck = data['cta-input-company'].length > 0,
             companyError = 'Enter a company.',
             errorCheckOverall = emailCheck && firstnameCheck && lastnameCheck && companyCheck,
             errors = [];

            console.log(errorCheckOverall, emailCheck, firstnameCheck, lastnameCheck, companyCheck);
            
            if (!errorCheckOverall) {

		       	if (!emailCheck) {
		       	    console.log(emailError);
		       	}
		       	if (!firstnameCheck) {
		       	    console.log(firstnameError);
		       	}
		       	if (!lastnameCheck) {
		       	    console.log(lastnameError);
		       	}
		       	if (!companyCheck) {
		       	    console.log(companyError);
		       	}
		       	console.log("denied!");
		      return;
		    
			} else {

				console.log("sending...");

			   var request = $.ajax({
			      // url:  'http://localhost:1437/api/salesRegistration',
			      url:  'http://10.20.3.1:8400/api/salesRegistration',
			      type: 'POST',
			      dataType: 'JSON',
			      async: true,
			      data: data
			   }).done(function(data) {

			   	if (data.success) {
					   console.log('success!');
					} else {
					   console.log('error:', data.message);
					}
			   
			   }).fail(function(xhr, status, err) {
			   	console.log('failed');
			   });
			}
    	});
	});

	//////////////////////////////////////////////
	// Window Scroll Detection (if needed)
	//////////////////////////////////////////////

	// $(window).scroll(function (e) {
 	//   	var scroll = $(window).scrollTop();
	   
	//    if (scroll > 0) {
	//    	modal.addClass('scrolled')
	//    } else {
	//    	modal.removeClass('scrolled')
	//    };
	// });

})(jQuery, window, document);

