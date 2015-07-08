(function($, window, document, undefined) {

	'use strict';

	//////////////////////
	// CTA dropdown 
	//////////////////////

	$(function() {
		var modal = $('.nav-desktop'),
			modalIsOpen = function() {
				var isOpen = /cover-all/.test(modal.attr('class'));
				return isOpen
			},
			form = $('.cta-form');

		$('li.nav-dropper').hover(function(e) {
			$('ul.nav-dropdown', this).stop(true, false).slideToggle(200);
			e.preventDefault();
		});

		$('.button-cta-nav').off('click').click(function() {
			if (!modalIsOpen()) {
				form.show();
				modal.addClass('cover-all');
				setTimeout(function() {
					modal.off('click').click(function(e) {
						e.preventDefault();
						var el = $(e.target),
							elForm = el.closest('.cta-form'),
							inForm = elForm.length > 0;
						if (!inForm && modalIsOpen()) {
							$('.cta-form').hide();
							modal.removeClass('cover-all');
							modal.off('click');
						}
					});
				}, 1);
			}
		});
	});


	//////////////////////////
	// Form data dump
	//////////////////////////

	$(function() {

		$('#cta-submit').click(function(e) {

			var data = {};

			e.preventDefault(); //prevent form from submitting

			$('#cta-form-post :input').each(function(i, e) {
				data[$(e).attr('id')] = $(e).val();
			});

			console.log(data);

			var userDisplayText = {
					success: "<p>Thank you!<br><br>Click the link we've emailed you to access our resources page!</p>",
					generalHelp: "<br>Please try again later or contact <a href='mailto:info@lucera.com?Subject=Website%20signup%20error' target='_top'>info@lucera.com</a> for help.</p>",
					contentError: '<p>Oops! Please fix {0} problem{1}: {2}</p>',
					contentErrorEmail: 'Invalid email address.',
					contentErrorFName: 'Please enter your first name.',
					contentErrorLName: 'Please enter your first name.',
					contentErrorCompany: 'Please enter your company.',
					serverError: '<p>Sorry, there was an error receiving your information on our end. {0}</p>',
					ajaxError: '<p>Sorry, there was an error submitting your information. {0}</p>'
				},
				emailRegex = /^[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,4}$/i,
				emailCheck = emailRegex.test(data['cta-input-email']),
				firstnameCheck = data['cta-input-first-name'].length > 0,
				lastnameCheck = data['cta-input-last-name'].length > 0,
				companyCheck = data['cta-input-company'].length > 0,
				errorCheckOverall = emailCheck && firstnameCheck && lastnameCheck && companyCheck,
				errors = [],
				responseArea = $('.cta-respond-message-wrap'),
				responseText = function(which, errorText, args) {
					var processedErrorText = String.format(errorText, args);
					responseArea.html(processedErrorText).show().addClass(which);

				};

			if (!errorCheckOverall) {

				if (!emailCheck) {
					errors.push(userDisplayText.contentErrorEmail);
				}
				if (!firstnameCheck) {
					errors.push(userDisplayText.contentErrorFName);
				}
				if (!lastnameCheck) {
					errors.push(userDisplayText.contentErrorLName);
				}
				if (!companyCheck) {
					errors.push(userDisplayText.contentErrorCompany);
				}

				// Show no-response error
				var oneError = (errors.length === 1);
				console.log('denied!', errors);
				responseText('error', userDisplayText.contentError, [
					oneError ? 'this' : 'these',
					oneError ? '' : 's',
					'<br> *' + errors.join('<br> *')
				]);

			} else {

				var request = $.ajax({
					// url:  'http://localhost:1437/api/salesRegistration',
					url: 'http://10.20.3.1:8400/api/salesRegistration',
					type: 'POST',
					dataType: 'JSON',
					async: true,
					data: data
				}).done(function(data) {

					if (data.success) {
						// Stash email in localStorage
						var testObject = { 'one': 1, 'two': 2, 'three': 3 };

						// Put the object into storage
						localStorage.setItem('testObject', JSON.stringify(testObject));

						// Retrieve the object from storage
						var retrievedObject = localStorage.getItem('testObject');

						console.log('retrievedObject: ', JSON.parse(retrievedObject));


						// Show success response
						responseText('success', userDisplayText.success);
					} else {
						console.log('error:', data.message);
						responseText('error', userDisplayText.serverError, [
							data.message
						]);
					}
				}).fail(function(xhr, status, err) {
					// console.log(xhr, status, err);
					// Show no-response error
					var data = ('responseJSON' in xhr) ? xhr.responseJSON : {
							message: (err ? (err + '.') : '') + ' Please try again later.'
						},
						oneError = data.message.length === 1;
					if (data && ('success' in data) && !data.success) {
						console.log('error:', data.message);
						responseText('error', userDisplayText.contentError, [
							oneError ? 'this' : 'these',
							oneError ? '' : 's',
							'<br> *' + data.message.join('<br> *')
						]);
					} else {
						responseText('error', userDisplayText.ajaxError, [
							data.message
						]);
					}
				});
			}
		});
	});

	//////////////////////////////////////////////////////////////
	// String.format
	//////////////////////////////////////////////////////////////

	if (!String.format) {
		String.format = function(format, args) {
			return format.replace(/{(\d+)}/g, function(match, number) {
				return typeof args[number] != 'undefined' ?
					args[number] :
					match;
			});
		};
	}



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