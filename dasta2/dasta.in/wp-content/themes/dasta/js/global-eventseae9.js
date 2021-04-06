
/*
 *
 * Update the user info ( if the session has been signed in )
 *
 */
$( function () {

	// If the user is not signed in, don't bother
	if ( ! ( __OMEGA__ && __OMEGA__.user && __OMEGA__.user.id ) )
		return;

	$( document ).trigger( "user::get", { id: __OMEGA__.user.id } );

} );



/*
 *
 * When a user's data is to be fetched
 *
 */
$( document ).on( "user::get", function ( event, data ) {

	// Fetch the lead based on the phone number
	var requestPayload = { id: data.id };
	var ajaxRequest = $.ajax( {
		url: "http://dasta.omega.lazaro.in/get-user-by-id",
		method: "POST",
		data: requestPayload,
		dataType: "json"
	} );
	ajaxRequest.done( function ( response ) {

		// Store the user data in the global state
		var userData = {
			verified: true,
			id: response.data.id,
			name: response.data.name,
			firstName: response.data.firstName,
			email: response.data.email,
			phoneNumber: response.data.phoneNumber
		};
		__OMEGA__.user = userData;

		// Authenticate the user
		// $( document ).trigger( "user::authenticated", {
		// 	verified: true,
		// 	id: response.data.id
		// } );

		// Broadcast the user data
		$( document ).trigger( "user::details", userData );

	} );

} );



/*
 *
 * When a user has been authenticated
 *
 */
$( document ).on( "user::authenticated", function ( event, data ) {

	// Create a cookie
	setCookie( "omega-user-v2", data, 90 * 24 * 60 * 60 );

} );



/*
 *
 * When a user has "signed out"
 *
 */
$( document ).on( "user::unauthenticate", function ( event ) {

	// Create a cookie and set its expiry back in time
	setCookie( "omega-user-v2", { }, -1 * 90 * 24 * 60 * 60 );
	__OMEGA__.user.verified = false;

} );



/*
 *
 * Acknowledge the user by revealing how much you know about them
 *
 */
// $( document ).on( "user::details", function ( event, data ) {

// 	var userInfoModalTemplate = $( ".js_template_user_info_modal" ).html();
// 	var renderedMarkup = __UTIL__.renderTemplate( userInfoModalTemplate, data );
// 	if ( renderedMarkup.indexOf( "undefined" ) !== -1 )
// 		return;

// 	var $renderedMarkup = $( renderedMarkup );
// 	$( "body" ).append( $renderedMarkup );
// 	$renderedMarkup.show();

// } );



/*
 *
 * Close the user info modal when the close button is clicked
 *
 */
$( document ).on( "click", ".js_modal_user_info_close", function ( event ) {
	var $modal = $( event.target ).closest( ".js_user_info_modal" );
	$( document ).trigger( "close::user-info-modal", $modal );
} );



/*
 *
 * Close the user info modal when the underlying overlay is clicked
 *
 */
$( document ).on( "click", ".js_user_info_modal_overlay", function ( event ) {
	var $modal = $( event.target ).closest( ".js_user_info_modal" );
	$( document ).trigger( "close::user-info-modal", $modal );
} );



/*
 *
 * When the user info modal is to be closed
 *
 */
$( document ).on( "close::user-info-modal", function ( event, $modal ) {
	$modal.remove();
} );
