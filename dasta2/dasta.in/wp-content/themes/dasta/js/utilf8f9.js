
__UTIL__ = { };

/*
 * Renders a template with data
 */
__UTIL__.renderTemplate = function () {

	var d;
	function replaceWith ( m ) {

		var pipeline = m.slice( 2, -2 ).trim().split( / *\| */ );
		var value = d[ pipeline[ 0 ] ];
		for ( var _i = 1; _i < pipeline.length; _i +=1 ) {
			value = __UTIL__.template[ pipeline[ _i ] ]( value );
		}

		return value;

	}

	return function renderTemplate ( template, data ) {
		d = data;
		return template.replace( /({{[^{}]+}})/g, replaceWith );
	}

}();

__UTIL__.template = { };

__UTIL__.template.hideIfNotPresent = function hideIfNotPresent ( thing ) {
	return thing ? "" : "hidden";
}

/*
 *
 * Format a number to an Indian Rupee
 *
 */
function formatNumberToIndianRupee ( number, options ) {

	options = options || { };
	var formattedNumber;

	var roundedNumber = number.toFixed( 0 );
	var integerAndFractionalParts = ( roundedNumber + "" ).split( "." );
	var integerPart = integerAndFractionalParts[ 0 ];
	var fractionalPart = integerAndFractionalParts[ 1 ];

	var lastThreeDigitsOfIntegerPart = integerPart.slice( -3 );
	var allButLastThreeDigitsOfIntegerPart = integerPart.slice( 0, -3 );

	formattedNumber = allButLastThreeDigitsOfIntegerPart.replace( /\B(?=(\d{2})+(?!\d))/g, "," );

	if ( allButLastThreeDigitsOfIntegerPart ) {
		formattedNumber += ",";
	}
	formattedNumber += lastThreeDigitsOfIntegerPart;

	if ( fractionalPart ) {
		formattedNumber += "." + fractionalPart;
	}

	var symbol = options.symbol === false ? "" : "₹";
	if ( /^-/.test( formattedNumber ) ) {
		formattedNumber = formattedNumber.replace( /^-/, "minus " + symbol );
	}
	else {
		formattedNumber = symbol + formattedNumber;
	}

	return formattedNumber;

}


/*
 *
 * Animate the count-down or count-up of a number in the INR format
 *
 */
function countToNumber ( $el, amount, options ) {

	options = options || { };
	var roundOffValue = options.round;
	var formatToINR = options.INR;

	// Cancel any animations that are already in progress for this element
	$el.stop( true );

	// We want to explicitly the starting point for the animation.
	// The is only needed for the first time an animation on an element is run.
	var currentAmount = $el.text().replace( /[^\d\.]/g, "" );
	$el.animate( { amount: currentAmount }, 0 ).stop( true, true );

	// Now, tween on!
	$el.animate( { amount: amount }, {
		duration: 999,
		progress: function () {
			var formattedAmount = this.amount;
			if ( roundOffValue )
				formattedAmount = Math.round( formattedAmount );
			if ( formatToINR )
				formattedAmount = formatNumberToIndianRupee( formattedAmount );

			$el.text( formattedAmount );
		}
	} );

}
