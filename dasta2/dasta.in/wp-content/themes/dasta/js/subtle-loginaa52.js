
/*

# algorithm
## primary
A phone trap has a button with an actionable label.
On clicking the button,
Check to see if the OMEGA user cookie is present.
If it is, follow through on the action and do not proceed with the below.
---

If it not, slide in an phone input field along with a submit button.
On hitting the submit button, validate the phone number.
If is not valid, let the user know, and do not proceed.
---

If the number is valid,
    1. Send an OTP
    2. Replace the phone input field with an OTP one
    3. And (again) a submit button next to it
    4. {nimp} Also, have a "Re-send OTP" link
On hitting the submit button, validate the OTP.
If the OTP does **not** match, let the user know, and do not proceed.
---

If the OTP matches, replace the form with a more assertive actionable button.
This button does what the initial button was supposed to do.

## other
Interacting with any other subtle login trap will reset all the other subtle login flows, i.e. rewind them back to the instigating button.


# implementation
Add a containing element for phone trap.

## class names
login widget
subtle login initiator
subtle login interactor

# ?
{nimp} how to make this contextually customizable?

 */

$( function () {

/*
 * -/-/-/-/-/-/-/-/-/-/-/-/
 * CUSTOM EVENT TRIGGER-ERS
 * -/-/-/-/-/-/-/-/-/-/-/-/
 */

    window.__OMEGA__ = window.__OMEGA__ || { }
    window.__OMEGA__.postEscapeSequences = { };

    /*
     *
     * On interacting with a component within a subtle login flow,
     *  Check to see if the user is logged in. If yes, close the flow.
     *
     */
    $( document ).on( "click submit", ".js_login_flow_interactor", function ( event ) {

        if ( ! getLoggedInUser() ) {
            return;
        }

        event.preventDefault();
        event.stopImmediatePropagation();

        // Close all the login flows on the page
        $( document ).trigger( "login-flow/close-all" );

        // $( document ).trigger( "user/get", { id: __OMEGA__.user.id } );

    } );



    /*
     *
     * When a phone country code is selected, reflect it in the label
     *
     */
    $( document ).on( "change", ".js_phone_country_codes", function ( event ) {

        var $phoneCallingCode = $( event.target );
        // var phoneCallingCode = $phoneCallingCode.val().replace( /[^+\d]/g, "" );
        var phoneCallingCode = $phoneCallingCode.val();

        $( ".js_phone_calling_code_label" ).text( phoneCallingCode );

    } );



    /*
     *
     * On submitting a phone number.
     *
     */
    $( document ).on( "submit", ".js_form_phone_number", function ( event ) {

        event.preventDefault();

        var $form = $( event.target );
        var context = $( event.target ).closest( ".js_action_requiring_login" ).data( "context" );

        // Disable the form
        $form.find( "input, select, button" ).prop( "disabled", true );

        // Get the phone number
        $phoneCountryCode = $form.find( "[ name = 'phone-country-code' ]" );
        $phoneNumber = $form.find( "[ name = 'phone-number' ]" );

        // Validate the data
        $form.removeClass( "js_error" );

        if ( $phoneNumber.val().replace( /\D/g, "" ).length < 10 ) {
            $form.addClass( "js_error" );
            alert( "Please enter a valid phone number." );
        }

        if ( $form.hasClass( "js_error" ) ) {
            $form.find( "input, select, button" ).prop( "disabled", false );
            return;
        }

        var phoneNumber = $phoneCountryCode.val().replace( /[^+\d]/g, "" )
                        + $phoneNumber.val();

        __OMEGA__.user = __OMEGA__.user || { };
        __OMEGA__.user.phoneNumber = phoneNumber;

        authenticateUser( { phoneNumber: phoneNumber }, function ( user ) {

            if ( ! user ) {
                $( document ).trigger( "login-flow/phone-number/verify", {
                    $form: $form,
                    phoneNumber: phoneNumber
                } );
            }
            else if ( user.isAlright ) {
                // Log the user in
                $( document ).trigger( "user/login", {
                    userId: user.id,
                    context: context
                } );
                // Close all the login flows on the page
                $( document ).trigger( "login-flow/close-all" );
            }

        } );

    } );

    /*
     *
     * On submitting an OTP.
     *
     */
    $( document ).on( "submit", ".js_form_otp", function ( event ) {

        event.preventDefault();

        var $form = $( event.target );

        // Disable the form
        $form.find( "input, select, button" ).prop( "disabled", true );

        // Get the phone number
        $otp = $form.find( "[ name = 'otp' ]" );

        var otp = $otp.val();

        verifyOTP( otp, function ( e ) {

            if ( e ) {
                alert( e );
                $form.find( "input, select, button" ).prop( "disabled", false );
                return;
            }

            // Register the user into the system
            var context = $( event.target ).closest( ".js_action_requiring_login" ).data( "context" );
            $( document ).trigger( "user/register", {
                phoneNumber: __OMEGA__.user.phoneNumber,
                context: context
            } );
            // Trigger a URL with the context
            var trackingContext = $( event.target ).closest( ".js_action_requiring_login" ).data( "trac-context" );
            if ( trackingContext )
                openPage( trackingContext );
            // Close all the login flows on the page
            $( document ).trigger( "login-flow/close-all" );

        } );

    } );

} );


/*
 * -/-/-/-/-/-/-/-/-/-/-/
 * CUSTOM EVENT HANDLERS
 * -/-/-/-/-/-/-/-/-/-/-/
 */

/*
 *
 * When a login flow is to be closed. This is either because,
 *  1. The user has filled the "login form" and all's good, OR
 *  2. The user is already signed in.
 *
 */
$( document ).on( "login-flow/close", function ( event, data ) {

    var $loginFlow = data.$loginFlow;

    // Hide the login flow forms
    $loginFlow.find( ".js_form_phone_number" ).slideUp();
    $loginFlow.find( ".js_form_otp" ).slideUp();

    // Show the corresponding "action widget"s
    window.document.documentElement.offsetTop; // Simply cause a reflow
    setTimeout( function () {
        $( "." + $loginFlow.data( "for" ) ).slideDown();
    }, 500 );

} );

/*
 *
 * When all login flows have to be closed.
 *
 */
$( document ).on( "login-flow/close-all", function ( event, data ) {

    $( ".js_action_requiring_login" ).each( function ( _i, el ) {
        $( document ).trigger( "login-flow/close", { $loginFlow: $( el ) } );
    } );

} );



/*
 *
 * When all login flows have to be shown
 *
 */
$( document ).on( "login-flow/show-all", function ( event, data ) {

    $( ".js_action_requiring_login" )
        .each( function ( _i, el ) {
            $( el ).find( ".js_form_otp" ).hide();
            $( el ).find( ".js_form_phone_number" )
                .find( "input, select, button" ).prop( "disabled", false );
            $( el ).find( ".js_form_phone_number:not(.js_trap_version)" ).show();
        } )
        .slideDown();

} );


/*
 *
 * When a phone number has to be verified.
 *
 */
$( document ).on( "login-flow/phone-number/verify", function ( event, data ) {

    var $form = data.$form;
    var phoneNumber = data.phoneNumber;

    sendOTP( phoneNumber, function ( e, otpSessionId ) {
        if ( e ) {
            alert( e );
            $form.find( "input, select, button" ).prop( "disabled", false );
            return;
        }
        __OMEGA__.user = __OMEGA__.user || { };
        __OMEGA__.user.otpSessionId = otpSessionId;
        $( document ).trigger( "login-flow/otp-form/show" );
    } );

} );

/*
 *
 * When the OTP form is to be shown.
 *  This happens when an OTP has been sent successfully to the given phone number.
 *
 */
$( document ).on( "login-flow/otp-form/show", function ( event, data ) {
    $( ".js_form_phone_number" ).slideUp();
    window.document.documentElement.offsetTop; // Simply cause a reflow
    setTimeout( function () {
        $( ".js_form_otp" ).slideDown();
    }, 500 );
} );

/*
 *
 * When a user's details have to be fetched.
 *
 */
$( document ).on( "user/get", function ( event, data ) {

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

    } );

} );



/*
 *
 * When a new user is to be registered.
 *
 */
$( document ).on( "user/register", function ( event, data ) {

    var phoneNumber = data.phoneNumber;
    var context = data.context;
    createUser( phoneNumber, context );

} );

/*
 *
 * When a user has to be logged in
 *
 */
$( document ).on( "user/login", function ( event, data ) {

    var userId = data.userId;
    var context = data.context;

    // Create a cookie
    setCookie( "omega-user-v2", { id: userId }, 90 * 24 * 60 * 60 );

    // Run post-escape sequence
    if ( __OMEGA__.postEscapeSequences[ context ] )
        __OMEGA__.postEscapeSequences[ context ]();


} );

/*
 *
 * On something.something
 *
 */
$( document ).on( "something/something", function ( event, data ) {
    //
} );



/*
 * -/-/-/-/-/
 * PAGE INIT
 * -/-/-/-/-/
 */

$( function () {

    // Close all the login flows if the user is logged in
    var user = getLoggedInUser();
    if ( user ) {
        $( document ).trigger( "login-flow/close-all" );
    }
    else {
        $( document ).trigger( "login-flow/show-all" );
    }

    /*
     *
     * Pre-populate the phone country codes and initialize them to India (+91)
     *
     */
    $( ".js_phone_country_codes" ).html( $( ".js_tmpl_phone_country_codes" ).html() );
    $( ".js_phone_country_codes" ).val( "in +91" ).trigger( "change" );

} );


/*
 * -/-/-/-/-/-/-/-/-/
 * UTILITY FUNCTIONS
 * -/-/-/-/-/-/-/-/-/
 */

/*
 *
 * Register post-escape sequence
 * This is a hook that triggers after a form trap is submitted and the user has been verified.
 *
 */
function registerSubtleLoginEscapeSequence ( context, fn ) {
    window.__OMEGA__.postEscapeSequences[ context ] = fn;
}

/*
 *
 * Check if the user is logged in
 *
 */
function getLoggedInUser () {

    // If the user is not signed in, don't bother
    if ( ! ( __OMEGA__ && __OMEGA__.user && __OMEGA__.user.id ) ) {

        var userCookieValue = docCookies.getItem( "omega-user-v2" );
        if ( ! userCookieValue )
            return false;

        var userData;
        try {
            userData = JSON.parse( atob( userCookieValue ) );
            if ( ! userData.id ) {
                return false;
            }
            else {
                __OMEGA__ = __OMEGA__ || { };
                __OMEGA__.user = userData;
                return userData;
            }
        } catch ( e ) {
            return false;
        }

    }
    else {
        return __OMEGA__.user;
    }


};



/*
 *
 * Authenticate a user
 *
 */
function authenticateUser ( credentials, callback ) {

    var phoneNumber = credentials.phoneNumber;

    // Build the payload
    var requestPayload = {
        phoneNumber: phoneNumber
    };

    // Try to fetch the user
    var ajaxRequest = $.ajax( {
        url: "http://dasta.omega.lazaro.in/get-user-by-phone",
        method: "POST",
        data: requestPayload,
        dataType: "json"
    } );

    ajaxRequest.done( function ( response ) {
        callback( response.data );
    } );
    ajaxRequest.fail( function () {
        callback( false );
    } );

};


/*
 *
 * Send an OTP to a given phone number
 *
 */
function sendOTP ( phoneNumber, callback ) {

    var verificationFlow = $.ajax( {
        url: "http://dasta.omega.lazaro.in/user-send-otp",
        data: { phoneNumber: phoneNumber }
    } );

    verificationFlow.done( function ( response ) {

        if ( response.Status.toLowerCase() != "error" ) {
            callback( null, response.Details );
            return;
        }

        var responseErrorMessage = response.Details.toLowerCase();
        if ( /invalid/.test( responseErrorMessage ) ) {
            callback( "The phone number you've provided is not valid. Please try again." );
        }

    } );

}



/*
 *
 * Send an OTP to a given phone number
 *
 */
function verifyOTP ( otp, callback ) {

    var verificationFlow = $.ajax( {
        url: "http://dasta.omega.lazaro.in/user-verify-otp",
        data: { otp: otp, otpSessionId: __OMEGA__.user.otpSessionId }
    } );

    verificationFlow.done( function ( response ) {
        if ( response.Status.toLowerCase() != "error" ) {
            callback();
            return;
        }
        var responseErrorMessage = response.Details.toLowerCase();
        if ( /mismatch/.test( responseErrorMessage ) ) {
            callback( "The OTP you have provided does not match. Please try again." );
        }
        else if ( /combination/.test( responseErrorMessage ) ) {
            callback( "The OTP you have provided does not match. Please try again." );
        }
        else if ( /expire/.test( responseErrorMessage ) ) {
            callback( "The OTP you have provided has expired. Please try again." );
        }
        else if ( /missing/.test( responseErrorMessage ) ) {
            callback( "You haven't provided an OTP. Please try again." );
        }
        else {
            callback( response.Details );
        }
    } );
    verificationFlow.fail( function ( response ) {
        callback( "The OTP you provided does not match the one we sent you." );
    } )

}


/*
 *
 * Create a user
 *
 */
function createUser ( phoneNumber, context ) {

    // Get the current timestamp
    var timestampAjaxRequest = $.ajax( "http://dasta.omega.lazaro.in/get-date-and-time", { dataType: "json" } );
    timestampAjaxRequest.done( function ( response ) {


        // Build the payload
        var requestPayload = {
            phoneNumber: phoneNumber,
            firstName: context,
            lastName: response.timestamp
        };

        // Fetch the lead based on the phone number
        var createLeadAjaxRequest = $.ajax( {
            url: "http://dasta.omega.lazaro.in/create-lead",
            method: "POST",
            data: requestPayload
        } );
        createLeadAjaxRequest.done( function ( response ) {

            // Mark the user as "validated"
            var userData = {
                id: response.data.id,
                phoneNumber: phoneNumber
            };
            __OMEGA__.user = userData;

            // Log in the user
            $( document ).trigger( "user/login", {
                id: response.data.id,
                context: context
            } );

        } );


    } );

}



/*
 *
 * Set a cookie asynchronously
 *
 * @params
 *  name -> the name of the cookie
 *  data -> an object with data that is to be encoded into the cookie
 *  duration -> how long before the cookie expires ( in seconds )
 *
 */
function setCookie ( name, data, duration ) {

    var url = "http://dasta.in/wp-content/themes/dasta/lib/set-cookie-async.php";
    var queryString = "?" + "_cookie=" + encodeURIComponent( name );
    queryString += "&_duration=" + encodeURIComponent( duration );
    queryString += "&data=" + encodeURIComponent( JSON.stringify( data ) );

    var $iframe = $( "<iframe>" );
    $iframe.attr( {
        width: 0,
        height: 0,
        title: "Set cookie",
        src: url + queryString,
        style: "display:none;",
        class: "js_iframe_cookie_setter"
    } );
    $( "body" ).append( $iframe );

    // Remove the iframe afterwards,
    // when we can safely that the page has been loaded and the cookie set
    setTimeout( function () {
        $iframe.remove()
    }, 5000 );

}



/*
 *
 * Cookie library
 *
 * madmurphy/cookies.js
 *
 */
var docCookies={getItem:function(e){return e?decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null:null},setItem:function(e,o,n,t,r,c){if(!e||/^(?:expires|max\-age|path|domain|secure)$/i.test(e))return!1;var s="";if(n)switch(n.constructor){case Number:s=n===1/0?"; expires=Fri, 31 Dec 9999 23:59:59 GMT":"; max-age="+n;break;case String:s="; expires="+n;break;case Date:s="; expires="+n.toUTCString()}return document.cookie=encodeURIComponent(e)+"="+encodeURIComponent(o)+s+(r?"; domain="+r:"")+(t?"; path="+t:"")+(c?"; secure":""),!0},removeItem:function(e,o,n){return this.hasItem(e)?(document.cookie=encodeURIComponent(e)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT"+(n?"; domain="+n:"")+(o?"; path="+o:""),!0):!1},hasItem:function(e){return!e||/^(?:expires|max\-age|path|domain|secure)$/i.test(e)?!1:new RegExp("(?:^|;\\s*)"+encodeURIComponent(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=").test(document.cookie)},keys:function(){for(var e=document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g,"").split(/\s*(?:\=[^;]*)?;\s*/),o=e.length,n=0;o>n;n++)e[n]=decodeURIComponent(e[n]);return e}};"undefined"!=typeof module&&"undefined"!=typeof module.exports&&(module.exports=docCookies);
