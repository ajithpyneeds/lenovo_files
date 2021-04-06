
$( function () {

	$( document ).on( "user::details", function ( event, data ) {

		var userInfoTemplate = $( ".js_template_user_info" ).html();

		var renderedMarkup = __UTIL__.renderTemplate( userInfoTemplate, data );
		if ( renderedMarkup.indexOf( "undefined" ) !== -1 )
			return;
		var $renderedMarkup = $( renderedMarkup );
		$renderedMarkup.hide();
		var $userInfo = $( ".js_user_info" );
		$userInfo.show();
		$userInfo.append( $renderedMarkup );
		$userInfo.children().each( function ( _i, el ) {
			$( el ).slideDown();
		} );
		// $renderedMarkup.slideDown();

	} );

	$( document ).on( "click", ".js_sign_out", function ( event ) {
		$( ".js_user_info" ).slideUp();
		setTimeout( function () {
			$( ".js_user_info" ).empty();
		}, 500 );
		$( document ).trigger( "user::unauthenticate" );
	} );

} );
