(function($, window, document, undefined) {

	'use strict';

	//////////////////////////
	// modal Form data dump
	//////////////////////////

	$(function() {

    	$('#modal-submit').click(function(e) {
	 		var data = {}

			e.preventDefault(); //prevent form from submitting
	    	
	    	$('#modal-form-post :input').each(function(i, e) { 
	    		data[$(e).attr('id')] = $(e).val();
	    	});

    		console.log(data);

    		var emailRegex = /^[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,4}$/i,
             emailCheck = emailRegex.test(data['modal-input-email']),
             emailError = 'Error: Invalid email address.',
             firstnameCheck = data['modal-input-first-name'].length > 0,
             firstnameError = 'Error: Please enter your first name.',
             lastnameCheck = data['modal-input-last-name'].length > 0,
             lastnameError = 'Error: Please enter your first name.',
             companyCheck = data['modal-input-company'].length > 0,
             companyError = 'Error: Please enter your company.',
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

		       	// Show no-response error
					$(function() {
				  		$('.modal-respond-message-wrap').show().append(
				  			"<p>Sorry, your information could not be submitted.<br />Please contact <a href='mailto:info@lucera.com?Subject=Website%20no%20response%20error' target='_top'>info@lucera.com</a> for assistance.</p>"
				  		);
					});
		      	return;
				} else {
				
					var request = $.ajax({
					   url:  'http://localhost:1437/api/salesRegistration',
					   // url:  'http://10.20.3.1:8400/api/salesRegistration',
					   type: 'POST',
					   dataType: 'JSON',
					   async: true,
					   data: data
					}).done(function(data) {

					if (data.success) {
					   // Show success response
						$(function() {
					  		$('.modal-respond-message-wrap').show().append(
					  			"<p>Thank you!</p>"
					  		);
						});
					   
					} else {
					   console.log('error:', data.message);
					   $(function() {
						$('.modal-respond-message-wrap').show().append(
							"<p>Sorry, there was a error receiving your information on our end. Please modal <a href='mailto:info@lucera.com?Subject=Website%20signup%20error' target='_top'>info@lucera.com</a> for help.</p>"
							);
						});
					}
				}).fail(function(xhr, status, err) {
					// Show no-response error
					$(function() {
				  		$('.modal-respond-message-wrap').show().append(
				  			"<p>Sorry, there was a error submitting your information on our end. Please modal <a href='mailto:info@lucera.com?Subject=Website%20error' target='_top'>info@lucera.com</a> for help.</p>"
				  		);
					});
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