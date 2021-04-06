
jQuery( function ( $ ) {

	/*
	 * Show the form on clicking the "We Visit Your Home" button
	 */
	$( ".js_home_visit_form_trigger" ).on( "click", function ( event ) {
		event.preventDefault();
		$( ".lightbox" ).show();
	} );

	/*
	 * Close the form on clicking anywhere on the overlay or on the close icon
	 */
	$( ".lightbox-overlay, .lightbox-close" ).on( "click", function () {
		$( ".lightbox" ).hide();
	} );


	/*
	 * On submitting the form
	 */
	$( ".js_form_home_visit" ).on( "submit", function ( event ) {

		/* -----
		 * Prevent the default form submission behaviour
		 * 	which triggers the loading of a new page
		 ----- */
		event.preventDefault();

		// Get a reference to the form element
		var $form = $( event.target );

		/* -----
		 * Disable the form
		 ----- */
		$form.find( "input, select, button" ).prop( "disabled", true );

		/* -----
		 * Pull the data from the form that the user provided
		 ----- */
		// name
		$name = $form.find( "[ name = 'name' ]" );
		// budget
		$budget = $form.find( "[ name = 'budget' ]" );

		/* -----
		 * Validate the data
		 ----- */
		// Remove any prior "error"s
		$form.find( ".js_error" ).removeClass( "js_error" );
		// Initialize a validation error message
		var validationMessages = [ ];
		// Name
		if ( ! $name.val().trim() ) {
			$name.parent().addClass( "js_error" );
			validationMessages.push( "name" );
		}
		// Budget
		if ( ! $budget.val() ) {
			$budget.parent().addClass( "js_error" );
			validationMessages.push( "budget" );
		}
		// If the form has even one error ( i.e. validation issue )
		// do not proceed
		if ( $form.find( ".js_error" ).length ) {
			var validationErrorMessage = "Please provide your " + validationMessages.join( ", " ) + ".";
			alert( validationErrorMessage );
			$form.find( "input, select, button" ).prop( "disabled", false );
			$form.find( "[ type = submit ]" ).text( "Try Again." );
			return;
		}

		/* -----
		 * If the data's good, then check if the user is logged in, else prompt
		 ----- */
		// Check to see if the user is logged in
		if ( ! getLoggedInUser() ) {
			// Re-enable this form
			$form.find( "input, select, button" ).prop( "disabled", false );
			// Now, hide this form
			$form.slideUp();
			// Show the phone form
			$form.next( ".js_form_phone_number" ).slideDown();
			return;
		}

		/* -----
		 * Feeback to User
		 ----- */
		$form.find( "[ type = submit ]" ).text( "Sending" );

		/* -----
		 * Process and Assemble the data
		 ----- */
		var names = $name.val().trim().split( /\s+/ );
		var firstName = names[ 0 ];
		var lastName = names.slice( 1 ).join( " " );
		var budget = $budget.val();

		var userData = {
			"First Name": firstName,
			"Last Name": lastName,
			"Budget": budget
		}
		var userId = __OMEGA__.user.id;

		updateUser( userId, userData )
			.then( function () {
				$form.get( 0 ).reset();
				$form.find( "[ type = submit ]" ).hide();
				$form.find( ".js_form_message" ).show();
			} )
			.catch( function ( e ) {
				console.log( e.message )
				$form.find( "[ type = submit ]" ).text( "Try Again" );
			} )

	} );

	registerSubtleLoginEscapeSequence( "Home Visit Form", function () {
		var $form = $( ".js_form_home_visit" );
		$form.slideDown( function () {
			$form.trigger( "submit" );
		} );
	} );

} );

/*
 *
 * Update a user
 *
 */
function updateUser ( id, data ) {

	// Build the payload
	var requestPayload = { fields: data };

	return new Promise( function ( resolve, reject ) {

		// Fetch the lead based on the phone number
		var updateUser__AjaxRequest = $.ajax( {
			url: "http://dasta.omega.lazaro.in/users/" + id,
			method: "POST",
			data: requestPayload
		} );
		updateUser__AjaxRequest.done( function ( response ) {
			resolve();
		} );
		updateUser__AjaxRequest.fail( function ( jqXHR, textStatus, e ) {
			var statusCode = -1;
			var message;
			if ( jqXHR.responseJSON ) {
				statusCode = jqXHR.responseJSON.statusCode;
				message = jqXHR.responseJSON.message;
			}
			else if ( typeof e == "object" ) {
				message = e.stack;
			}
			else {
				message = jqXHR.responseText;
			}
			reject( { code: statusCode, message: message } );
		} );

	} );

}

function oldExitForm () {

	if ( ! $( "#exit_form_submit" ).length )
		return;

	$( window ).on( "load", function ( event ) {
		var e = document.createElement( "script" );
		e.type = "text/javascript";
		e.src = rootURL + "/wp-content/themes/dasta/js/crossdasta.min.js";
		e.async = true;
		document.body.appendChild( e );
	} );

	$( "#exit_form_submit" ).on( "click", function () {
		ga( "send", "event", "Lead", "General", "Form Fill" );
	} );

	$( ".exit-form-complete" ).hide();
	$( ".exit-form-fail" ).hide();

	$( "#exit-form" ).validate( {

		submitHandler: function ( e ) {

			$( ".exit-form-complete" ).hide();
			$( ".exit-form-fail" ).hide();

			/* -----
			 * LOG TO SERVER
			 ----- */
			var $form = $( e );
			var data = { };
			data.form = "User Exit Detail Drop";
			data.name = $form.find( "[ name = 'ex-name' ]" ).val();
			data.phoneNumber = $form.find( "[ name = 'ex-mobile' ]" ).val();
			data.budget = $form.find( "[ name = 'ex-budget' ] > option:selected" ).text();

			$.ajax( {
				url: "wp-content/themes/dasta/server/log.php",
				method: "POST",
				data: data
			} );

			window.console.log( $( e ).serialize() );
			$
				.post( $( e ).attr( "action" ), $( e ).serialize(), function () {
					$( ".lightbox" ).hide();
					$( ".exit-form-complete" ).show();
					openPage( "site-visit" );
				} )
				.fail( function () {
					$( ".lightbox" ).hide();
					$( ".exit-form-fail" ).show();
				} )
		},
		errorPlacement: function ( e, t ) {
			e.appendTo( t.parent().prev( "span" ).first() );
		}
	} )

	$( ".lightbox-overlay, .lightbox-close" ).on( "click", function () {
		$( ".lightbox" ).hide();
	} );
	// $( "#exit_form_trigger" ).on( "click", function () {
	// 	$( ".lightbox" ).show();
	// } );

}
