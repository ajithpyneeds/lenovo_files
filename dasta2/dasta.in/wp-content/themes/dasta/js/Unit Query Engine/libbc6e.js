
/*
 * -/-/-/-/-/-/-/-/-
 * Helper Functions
 * -/-/-/-/-/-/-/-/-
 */

/*
 *
 * Fetches the workbook and triggers a "load::spreadsheet" event once it has it
 *
 */
function getWorkbook () {

	var workbookFile = projectPath + "/assets/numbers.xlsx";
	// cache-busting
	workbookFile += "?v=" + window.__PRICING_ENGINE__.version.replace( /\./g, "" );

	// Set up an async GET request
	var request = new XMLHttpRequest();
	request.open( "GET", workbookFile, true );
	request.responseType = "arraybuffer";

	request.onload = function ( event ) {

		var data = new Uint8Array( request.response );
		var workbook = XLSX.read(
			data,
			{
				type: "array",
				cellHTML: false,
				cellText: false
			}
		);

		$( document ).trigger( "load::spreadsheet", workbook );

	}

	request.send();

}



/*
 *
 * This function pull the projects constants into a neat JavaScript object
 *
 */
var getProjectConstants = function () {

	var projectConstants;

	return function getProjectConstants ( workbook ) {

		if ( projectConstants ) return projectConstants;

		var sheet = workbook.Sheets.project_constants
		var startAndEndCells = sheet[ "!ref" ].split( ":" )
		var firstRow = parseInt( startAndEndCells[ 0 ].match( /\d+/ )[ 0 ], 10 )
		var lastRow = parseInt( startAndEndCells[ 1 ].match( /\d+/ )[ 0 ], 10 )

		projectConstants = { };
		var currentRow, key, value;
		for ( currentRow = firstRow; currentRow <= lastRow; currentRow += 1 ) {
			key = sheet[ "A" + currentRow ].v
			value = sheet[ "B" + currentRow ].v
			projectConstants[ key ] = value
		}

		return projectConstants

	};

}();



/*
 *
 * Returns a list of floors along with the number of units available on them
 * for a given apartment type
 *
 */
function getFloorAvailabilityListByType ( units, type ) {

	// Create a floor availability template object
	var floorAvailabilityListTemplateObject =
		[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ]
		.map( function ( number ) {
			return { floor: number, available: 0 };
		} );

	var floorAvailabilityList = units
		.filter( function ( unit ) { return unit.BHK == type && unit.Availability == 1 } )
		.reduce( function ( floorAvailability, unit ) {
			floorAvailability[ unit.Floor ].available += 1;
			return floorAvailability;
		}, $.extend( true, [ ], floorAvailabilityListTemplateObject ) )
		.map( function ( floor ) {
			floor.attrs = floor.available <= 0 ? "disabled" : "";
			return floor;
		} )

	return floorAvailabilityList;

}



/*
 *
 * Return the list of apartments that match the given conditions.
 * Conditions include,
 * 	- Type
 * 	- Floor
 * 	- Availability
 *
 */
function getApartmentsBasedOnCriteria ( units, criteria ) {

	var theUnits = units
		.filter( function ( unit ) {
			var criterion;
			for ( criterion in criteria ) {
				if (
					( criteria[ criterion ] != void 0 )
					&& ( unit[ criterion ] != criteria[ criterion ] )
				) {
					return false;
				}
			}
			return true;
		} );

	return theUnits;

}



/*
 *
 * This function runs the input through the spreadsheet and returns the computed values
 * More specifically, it
 *	- takes in input
 *	- writes it to the spreadsheet
 *	- performs a re-calculation
 *	- reads out the values
 *
 */
function getComputedApartmentDetails ( workbook, parameters ) {

	var inputRangeValues = [ ];
	inputRangeValues.push( parameters.unit || "" );
	inputRangeValues.push( parameters.rateDiscount || "" );
	inputRangeValues.push( parameters.cornerDiscount || "" );
	inputRangeValues.push( parameters.viewDiscount || "" );
	inputRangeValues.push( parameters.collapsibleBedroomWall ? 1 : "" );
	inputRangeValues.push( parameters.livingDiningSwap ? 1 : "" );
	inputRangeValues.push( parameters.poojaRoom ? 1 : "" );
	inputRangeValues.push( parameters.storeRoom ? 1 : "" );
	inputRangeValues.push( parameters.carParkSwitch ? 1 : "" );
	inputRangeValues.push( parameters.name || "" );
	inputRangeValues.push( parameters.email || "" );
	inputRangeValues.push( parameters.phoneNumber || "" );
	inputRangeValues.push( parameters.uid || "" );
	inputRangeValues.push( parameters.timestamp || "" );
	inputRangeValues.push( parameters.author || "" );

	// Resolve the input and output ranges where data will be written and read out of
	var namedRanges = workbook.Workbook.Names.reduce( function ( ranges, currentRange ) {
		var name = currentRange.Name;
		var sheet = currentRange.Ref.split( "!" )[ 0 ];
		var cells = currentRange.Ref.split( "!" )[ 1 ];
		ranges[ name ] = { sheet: sheet, cells: cells };
		return ranges;
	}, {} )
	var inputRangeSheetName = namedRanges.inputRangeStart.sheet;
	var inputRangeStart = namedRanges.inputRangeStart.cells;
	var outputRangeSheet = workbook.Sheets[ namedRanges.outputRange.sheet ];
	var outputRange = XLSX.utils.decode_range( namedRanges.outputRange.cells );

	// write in the input
	XLSX.utils.sheet_add_aoa( workbook.Sheets[ inputRangeSheetName ], [ inputRangeValues ], { origin: inputRangeStart } )

	// Trigger a re-calculation on the spreadsheet
	XLSX_CALC( workbook );

	// Extract the computed values
	var unit = {};
	for ( var c = outputRange.s.c; c <= outputRange.e.c; c += 1 ) {
		var cellAddressOfKey = XLSX.utils.encode_cell( { r: 0, c: c } );
		var key = outputRangeSheet[ cellAddressOfKey ].v;
		var cellAddressOfValue = XLSX.utils.encode_cell( { r: 1, c: c } );
		var value = outputRangeSheet[ cellAddressOfValue ].v;
		unit[ key ] = value;
	}

	return unit;

}



/*
 *
 * Get the markup containing all the details pertaining to a unit
 *
 */
function getUnitView ( unitId ) {

	// Disable the interface
	// Fill in this space

	var unitParameters = __PRICING_ENGINE__.unitParameters;
	var allUnits = __PRICING_ENGINE__.allUnits;
	var unitIndex;
	allUnits.some( function ( unit, index ) {
		if ( unit.Unit == unitId ) {
			unitIndex = index;
			return true;
		}
	} );

	__PRICING_ENGINE__.unitConstants = allUnits[ unitIndex ];

	// Calculate data from the spreadsheet and assign to the local state
	__PRICING_ENGINE__.unitData = getComputedApartmentDetails( __PRICING_ENGINE__.workbook, { unit: unitParameters.unit } );


	// Build and plonk in the markup
	$( ".js_unit_info_container" ).load(
		// projectPath + "/templates/test.php",
		projectPath + "/templates/unit-info.php",
		$.extend( { projectPath: projectPath }, __PRICING_ENGINE__.unitConstants, __PRICING_ENGINE__.unitData, __PRICING_ENGINE__.unitParameters )
	);

	// Broadcast the fact that a unit view has been fetched
	$( document ).trigger( "load::unit-view", { unit: unitId } );

	// For the EMI calculator
	$( ".js_emi_toggle" ).removeClass( "hidden" )
	totalPrice = __PRICING_ENGINE__.unitData.total_grand

	// Reflect the new figures elsewhere
	$( document ).trigger( "change::grand-total" );

	// $( ".js_enquiry_form [ name = enquiry-unit ]" ).val( unitId );


	// Re-enable the interface
	// Fill in this space

}


/*
 *
 * Calculate the EMI
 *
 */
function calculateEMI () {

	var $emiDownPayment = $( ".js_emi_calculator [ name = 'down-payment' ]" );
	var $emiDownPaymentPercentage = $( ".js_emi_calculator .js_down_payment_percentage" );
	var $emiLoanAmount = $( ".js_emi_calculator [ name = 'loan-amount' ]" );
	var $emiTenure = $( ".js_emi_calculator [ name = 'tenure' ]" );
	var $emiInterestRate = $( ".js_emi_calculator [ name = 'interest-rate' ]" );

	var loanAmount = parseInt( $emiLoanAmount.val().replace( /[^\d\.]/g, "" ), 10 );
	var tenureInMonths = parseInt( $emiTenure.val(), 10 )
	var interestRate = $emiInterestRate.val() / 1200

	var emi = Math.round( ( loanAmount * interestRate * Math.pow( 1 + interestRate, tenureInMonths ) ) / ( Math.pow( 1 + interestRate, tenureInMonths ) - 1 ) )

	$( ".js_estimated_emi" ).text( formatNumberToIndianRupee( emi ) );
	$( ".js_total_amount_payable" ).text( formatNumberToIndianRupee( emi * tenureInMonths ) );
	$( ".js_principal_amount" ).text( formatNumberToIndianRupee( loanAmount ) );
	$( ".js_interest_amount" ).text( formatNumberToIndianRupee( emi * tenureInMonths - loanAmount ) );

}


/*
 *
 * Set a cookie asynchronously
 *
 * @params
 * 	name -> the name of the cookie
 * 	data -> an object with data that is to be encoded into the cookie
 * 	duration -> how long before the cookie expires ( in seconds )
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
 * Cookie library
 *
 * madmurphy/cookies.js
 *
 */
var docCookies={getItem:function(e){return e?decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null:null},setItem:function(e,o,n,t,r,c){if(!e||/^(?:expires|max\-age|path|domain|secure)$/i.test(e))return!1;var s="";if(n)switch(n.constructor){case Number:s=n===1/0?"; expires=Fri, 31 Dec 9999 23:59:59 GMT":"; max-age="+n;break;case String:s="; expires="+n;break;case Date:s="; expires="+n.toUTCString()}return document.cookie=encodeURIComponent(e)+"="+encodeURIComponent(o)+s+(r?"; domain="+r:"")+(t?"; path="+t:"")+(c?"; secure":""),!0},removeItem:function(e,o,n){return this.hasItem(e)?(document.cookie=encodeURIComponent(e)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT"+(n?"; domain="+n:"")+(o?"; path="+o:""),!0):!1},hasItem:function(e){return!e||/^(?:expires|max\-age|path|domain|secure)$/i.test(e)?!1:new RegExp("(?:^|;\\s*)"+encodeURIComponent(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=").test(document.cookie)},keys:function(){for(var e=document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g,"").split(/\s*(?:\=[^;]*)?;\s*/),o=e.length,n=0;o>n;n++)e[n]=decodeURIComponent(e[n]);return e}};"undefined"!=typeof module&&"undefined"!=typeof module.exports&&(module.exports=docCookies);
