
/*
 *
 * The data structure that represents the state of the Unit Query Engine
 *
 */
window.__PRICING_ENGINE__ = window.__PRICING_ENGINE__ || { };
window.__PRICING_ENGINE__.unitFilters = {
	Availability: 1,
	BHK: null,
	Floor: null
};
window.__PRICING_ENGINE__.unitParameters = {
	author: null,
	timestamp: null,
	unit: null,
	rateDiscount: null,
	cornerDiscount: null,
	viewDiscount: null,
	collapsibleBedroomWall: null,
	livingDiningSwap: null,
	poojaRoom: null,
	storeRoom: null,
	carParkSwitch: null,
	name: null,
	email: null,
	uid: null,
	phoneNumber: null
};
window.__PRICING_ENGINE__.unitConstants = { };
window.__PRICING_ENGINE__.unitData = { };



/*
 *
 * Extend the XLSX-CALC library with s'more formulae
 *
 */
XLSX_CALC.import_functions( spreadsheetFormulae );



/*
 *
 * Fetch the workbook and trigger a "load::spreadsheet" event once that's done
 *
 */
getWorkbook();



/*
 *
 * Setup more vars in our custom "Unit Query Engine" global namespace
 *
 */
$( document ).one( "load::spreadsheet", function ( event, workbook ) {

	var credentials = decodeURIComponent( document.cookie.replace( new RegExp( "(?:(?:^|.*;)\\s*" + encodeURIComponent( "auth" ).replace( /[\-\.\+\*]/g, "\\$&" ) + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1" ) );
	try {
		credentials = JSON.parse( atob( credentials ) )
		if ( credentials.role == "executive" ) {
			credentials.role = "";
		}
	} catch ( e ) {
		credentials = null;
	}

	__PRICING_ENGINE__.workbook = workbook;
	__PRICING_ENGINE__.projectConstants = getProjectConstants( workbook );

	// Get user role
	var role = "";
	if ( credentials ) {
		role = ( credentials.role ? "_" : "" ) + credentials.role;
		__PRICING_ENGINE__.projectConstants.author = credentials.name;
	}
	__PRICING_ENGINE__.allUnits = XLSX.utils.sheet_to_row_object_array( workbook.Sheets[ "unit_constants" + role ] );

} );



/*
 *
 * On setting the Apartment Type
 *
 */
$( document ).one( "load::spreadsheet", function ( event, workbook ) {

	$( ".js_unit_type [ type = radio ]" ).on( "change", function ( event, data ) {

		// Disable the interface
		$( ".js_unit_type" ).prop( "disabled", true );

		// Mark the selected type visually
		$( ".js_unit_type" ).removeClass( "selected" );
		$( event.target ).closest( ".js_unit_type" ).addClass( "selected" );

		// Get the apartment type and set it to the state
		var unitFilters = __PRICING_ENGINE__.unitFilters;
		var unitType = $( event.target ).val();
		unitFilters.BHK = unitType;

		var floorAvailabilityList = getFloorAvailabilityListByType( __PRICING_ENGINE__.allUnits, unitFilters.BHK );

		$( ".js_unit_floor_selector_container" )
			.load( projectPath + "/templates/units-available-by-floor.php", { floorAvailabilityList: floorAvailabilityList }, function () {
					var $firstFloorWhereSomethingsAvailable = $( ".js_unit_floor_selector_container .js_floor.selected input" );
					if ( $firstFloorWhereSomethingsAvailable.length ) {
						$firstFloorWhereSomethingsAvailable.trigger( "click", data )
					}
					else {
						var unitTypeReadable;
						if ( unitType == 1 ) unitTypeReadable = "studio"
						if ( unitType == 2 ) unitTypeReadable = "2BHK"
						if ( unitType == 3 ) unitTypeReadable = "3BHK"
						$( ".js_info_sentence" ).text( "All " + unitTypeReadable + " apartments are sold out." );
						$( ".js_floorplan_map" ).slideUp();
						$( ".js_unit_selector" ).slideUp();
					}
			} )

		// Re-enable the interface
		$( ".js_unit_type" ).prop( "disabled", false );

		// Broadcast the unit-type change
		$( document ).trigger( "change::unit-type", {
			type: unitType
		} );

	} );

} );



/*
 *
 * On selecting a floor
 *
 */
$( document ).one( "load::spreadsheet", function ( event, workbook ) {

	$( document ).on( "change", ".js_unit_floor_selector_container select", onSelectingAFloor );
	$( document ).on( "change", ".js_unit_floor_selector_container input[ type = radio ]", onSelectingAFloor );
	function onSelectingAFloor ( event, data ) {

		data = data || { };

		// If a "disabled" floor button is hit ( for larger screens ), do not proceed
		if ( $( event.target ).parent().hasClass( "disabled" ) ) return false;

		var $floorSelector = $( event.target ).closest( ".js_unit_floor_selector_container" )

		// Disable the interface
		$floorSelector.find( "select" ).prop( "disabled", true );
		$floorSelector.find( ".js_floor" ).prop( "disabled", true );

		// Get the selected floor and set it to the state
		var unitFilters = __PRICING_ENGINE__.unitFilters;
		var $floor = $( event.target );
		var selectedFloor = $floor.val();
		unitFilters.Floor = selectedFloor

		// Mark the selected floor visually
		// var previouslySelectedFloor = $floorSelector.find( ".js_floor.selected" ).data( "value" );
		$floorSelector.find( ".js_floor.selected" ).removeClass( "selected" );

		$floorSelector
			.find( ".js_floor:eq(" + unitFilters.Floor + ")" )
			.addClass( "selected" );
		$floorSelector
			.find( "select option:eq(" + unitFilters.Floor + ")" )
			.prop( "selected", true );

		var ordinals = [ "Ground", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th" ];
		var floorAvailabilityList = getFloorAvailabilityListByType( __PRICING_ENGINE__.allUnits, unitFilters.BHK )
		$floorSelector
			.find( ".js_floor_in_words" )
			.text( ordinals[ unitFilters.Floor ] + " floor" )
		$floorSelector
			.find( ".js_available_in_words" )
			.text( floorAvailabilityList[ unitFilters.Floor ][ 'available' ] + " available" )

		// Build and plonk in the unit list markup
		var units = getApartmentsBasedOnCriteria( __PRICING_ENGINE__.allUnits, unitFilters );
		$( ".js_unit_list_container" ).load(
			projectPath + "/templates/unit-list.php",
			{ units: units }
		);
		$( ".js_unit_selector" ).slideDown();

		// Re-enable the interface
		$floorSelector.find( "select" ).prop( "disabled", false );
		$floorSelector.find( ".js_floor" ).prop( "disabled", false );

		// Broadcast the floor change
		$( document ).trigger( "change::unit-floor", {
			floor: selectedFloor, units: units
		} );

	}

} );



/*
 *
 * When a floor a selected, mention how many apartments are available on
 * that floor in a nicely worded sentence.
 *
 */
$( document ).on( "change::unit-floor", function ( event, data ) {

	// Extract the data
	var floor = data.floor;
	var units = data.units;

	// Declare useful helper data
	var ordinals = [ "Ground", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th" ];

	var sentence;
	var unitType = __PRICING_ENGINE__.unitFilters.BHK;
	var numberOfUnits = units.length;

	if ( unitType == 1 ) unitType = "Studio"
	else if ( unitType == 2 ) unitType = "2BHK"
	else if ( unitType == 3 ) unitType = "3BHK"

	if ( numberOfUnits == 0 ) {
		sentence = "No apartments"
	}
	else if ( numberOfUnits == 1 ) {
		sentence = "1 " + unitType
	}
	else {
		sentence = numberOfUnits + " " + unitType + "s"
	}
	sentence += " available on the " + ordinals[ floor ] + " floor";

	$( ".js_info_sentence" ).text( sentence );

} );

/*
 *
 * When a floor a selected, reflect it in the Floorplan selector
 *
 */
$( document ).on( "change::unit-floor", function ( event, data ) {

	// Extract the data
	var floor = data.floor;
	var units = data.units;

	// Fade out and un-mark all the unit plans
	$( ".floorplan" ).fadeOut();
	$( ".floorplan g" ).each( function ( _i, el ) {
		var $el = $( el );
		var className = $el.attr( "class" )
						.replace( "available", "" )
						.replace( "selected", "" )
						.trim();
		$el.attr( "class", className );
	} );

	var floorplan;
	if ( floor == 0 )
		floorplan = "ground"
	else if ( floor == 1 )
		floorplan = "first"
	else if ( floor == 14 )
		floorplan = "penthouse"
	else
		floorplan = "typical"

	// Change the floorplan base image
	$( ".js_floorplan_map" )
		.removeClass( "ground-floor first-floor typical-floor penthouse-floor" )
		.addClass( floorplan + "-floor" )

	// Fill in the unit numbers
	$( ".js_unit_numbers [ data-series ]" ).each( function ( _i, el ) {
		var $el = $( el )
		$el.text( floor + "0" + $el.data( "series" ) );
	} )
	if ( floor == 0 || floor == 1 || floor == 14 )
		$( ".js_unit_numbers [ data-series = 9 ]" ).text( "" )

	units.forEach( function ( unit ) {
		var series = unit.Unit.slice( -1 );
		var $unitOutline = $( ".js_floorplan_" + floorplan + "_floor g.js_series_" + series );
		var unitOutlineClass = $unitOutline.attr( "class" ) + " available";
		$unitOutline.attr( "class", unitOutlineClass );
		$unitOutline.get( 0 ).id = "u" + unit.Unit;
	} )

	// Finally, show the floor plan and the floor map ( if it isn't already being shown )
	$( ".js_floorplan_" + floorplan + "_floor" ).fadeIn();
	$( ".js_floorplan_map" ).slideDown();

} );



/*
 *
 * On selecting a unit
 *
 */
$( document ).one( "load::spreadsheet", function ( event, workbook ) {

	$( document ).on( "click", ".js_unit_view", function ( event ) {

		var $target = $( event.target ).closest( ".js_unit_view" );

		// Get the selected unit and set it to the state
		var unitId;
		if ( $target.is( "g" ) )
			unitId = $target.attr( "id" ).replace( "u", "" )
		else
			unitId = $target.closest( "[ data-value ]" ).data( "value" )
		var unitParameters = __PRICING_ENGINE__.unitParameters;


		// Visually reflect the selected unit on the UI
		// First, "un-select" any unit that is already selected
		$( "g.selected" ).closest( "svg" ).find( "g" ).each( function ( _i, el ) {
			var $el = $( el );
			var className = $el.attr( "class" ).replace( "selected", "" ).trim();
			$el.attr( "class", className );
		} )
		$( ".js_unit_view" ).removeClass( "selected" )
		// Second, mark the selected as such
		$( "g#u" + unitId ).attr(
			"class",
			$( "g#u" + unitId ).attr( "class" ) + " selected"
		);
		$( ".js_unit_view[ data-value = " + unitId + " ]" ).addClass( "selected" )


		// Reset the user customizable parameters
		for ( var param in unitParameters ) {
			unitParameters[ param ] = null;
		}
		// Set the new unit
		unitParameters.unit = unitId;

		// Change the label on the lead form
		$( ".js_lead_form .js_label" ).text( "Apartment #" + unitId + " selected" );

		// If the unit plan on the floorplan map was hit, do not proceed
		if ( $target.is( "g" ) )
			return;

		// Broadcast the fact that a unit has been selected
		$( document ).trigger( "select::unit", { unit: unitId } );

	} );

} );



/*
 *
 * On adding / removing modifications and custom values
 *
 */
$( document ).on( "change", "[ data-mod ]", function ( event ) {

	// Disable the interface
	// Fill in this space



	// Perform a re-calculation
	// Constrain the custom parameter values ( if need be ) and extract them
	var unitParameters = __PRICING_ENGINE__.unitParameters;
	$( "[ data-mod ]" ).each( function ( _i, el ) {
		var $el = $( el );
		var mod = $el.data( "mod" );
		var value;
		if ( $el.is( "[ type = checkbox ]" ) ) {
			value = $el.is( ":checked" );
		}
		else {
			value = parseFloat( $el.val() );
			if ( value < $el.attr( "min" ) ) {
				value = $el.attr( "min" );
				$el.val( value );
			}
			if ( value > $el.attr( "max" ) ) {
				value = $el.attr( "max" );
				$el.val( value );
			}
		}
		unitParameters[ mod ] = value;
	} );

	__PRICING_ENGINE__.unitData = getComputedApartmentDetails( __PRICING_ENGINE__.workbook, unitParameters );

	// Reflect the new figures in all the fields
	$( ".js_unit_info [ data-field ]" ).each( function ( _i, el ) {
		var $el = $( el );
		var field = $el.data( "field" );
		// $el.text( formatNumberToIndianRupee( __PRICING_ENGINE__.unitData[ field ] ) );
		countToNumber( $el, __PRICING_ENGINE__.unitData[ field ], { INR: true } )
	} )

	// Reflect the new figures elsewhere
	$( document ).trigger( "change::grand-total" );

	// Re-enable the interface
	// Fill in this space

} );




/*
 *
 * On tinkering with the EMI calculator
 *
 */
// Toggling the EMI calculator widget
$( document ).on( "click", ".js_emi_toggle", function ( event ) {
	var $toggleState = $( ".js_emi_toggle .js_state" );
	if ( $toggleState.data( "state" ) == "open" ) {
		$toggleState
			.data( "state", "close" )
			.text( "+" )
	}
	else {
		$toggleState
			.data( "state", "open" )
			.text( "–" )
	}
	$( ".js_emi_content" ).slideToggle();
} );

/* Pre-fill in the values in the EMI calculator whenever the grand total changes */
$( document ).on( "change::grand-total", function () {

	var $emiDownPayment = $( ".js_emi_calculator [ name = 'down-payment' ]" );
	var $emiDownPaymentPercentage = $( ".js_emi_calculator .js_down_payment_percentage" );
	var $emiLoanAmount = $( ".js_emi_calculator [ name = 'loan-amount' ]" );
	var $emiTenure = $( ".js_emi_calculator [ name = 'tenure' ]" );
	var $emiInterestRate = $( ".js_emi_calculator [ name = 'interest-rate' ]" );

	var grandTotal = __PRICING_ENGINE__.unitData.total_grand;

	var downPaymentPercentage = parseInt( $emiDownPaymentPercentage.text().replace( /[^\d\.]/g, "" ), 10 ) / 100;
	$emiDownPayment.val( formatNumberToIndianRupee( downPaymentPercentage * grandTotal, { symbol: false } ) )
	$emiLoanAmount.val( formatNumberToIndianRupee( ( 1 - downPaymentPercentage ) * grandTotal, { symbol: false } ) )

	if ( ! $emiTenure.val().trim() )
		$emiTenure.val( projectConstants[ "Loan Tenure" ] )

	if ( ! $emiInterestRate.val().trim() )
		$emiInterestRate.val( projectConstants[ "Interest Rate" ] )

	calculateEMI();

} );

$( ".js_emi_calculator [ name = 'down-payment' ]" ).on( "input", function ( event ) {

	var $emiDownPayment = $( event.target );
	var $emiLoanAmount = $( ".js_emi_calculator [ name = 'loan-amount' ]" );
	var $emiDownPaymentPercentage = $( ".js_emi_calculator .js_down_payment_percentage" );

	var grandTotal = __PRICING_ENGINE__.unitData.total_grand;

	// Calculate the loan amount
	var downPayment = parseInt( $emiDownPayment.val().replace( /[^\d\.]/g, "" ), 10 );
	var loanAmount = grandTotal - downPayment;
	$emiLoanAmount.val( formatNumberToIndianRupee( loanAmount, { symbol: false } ) );

	// Calculate the down payment percentage
	var downPaymentPercentage = Math.round( downPayment / grandTotal * 100 );
	$emiDownPaymentPercentage.text( downPaymentPercentage + "%" );

	// Calculate all the EMI values
	calculateEMI();

} )

// Change the car park type accordingly
$( document ).on( "change", "[ data-mod ]", function ( event ) {

	var $carParkType = $( ".js_unit_info .js_carpark_type" );
	if ( $carParkType.text() == "covered" ) {
		$carParkType.text( "semi-covered" )
	}
	else {
		$carParkType.text( "covered" )
	}

} );

$( ".js_emi_calculator [ name = 'down-payment' ]" ).on( "blur", function () {
	var $emiDownPayment = $( event.target );
	var formattedValue = formatNumberToIndianRupee( parseInt( $emiDownPayment.val().replace( /[^\d\.]/g, "" ) ), { symbol: false } );
	$emiDownPayment.val( formattedValue );
} )

$( ".js_emi_calculator [ name = 'loan-amount' ]" ).on( "input", function ( event ) {

	var $emiLoanAmount = $( event.target );
	var $emiDownPayment = $( ".js_emi_calculator [ name = 'down-payment' ]" );
	var $emiDownPaymentPercentage = $( ".js_emi_calculator .js_down_payment_percentage" );
	var grandTotal = __PRICING_ENGINE__.unitData.total_grand;

	// Calculate the down payment
	var loanAmount = parseInt( $emiLoanAmount.val().replace( /[^\d\.]/g, "" ), 10 );
	var downPayment = grandTotal - loanAmount;
	$emiDownPayment.val( formatNumberToIndianRupee( downPayment, { symbol: false } ) );

	// Calculate the down payment percentage
	var downPaymentPercentage = Math.round( downPayment / grandTotal * 100 );
	$emiDownPaymentPercentage.text( downPaymentPercentage + "%" );

	// Calculate all the EMI values
	calculateEMI();

} )

$( ".js_emi_calculator [ name = 'loan-amount' ]" ).on( "blur", function () {
	var $emiLoanAmount = $( event.target );
	var formattedValue = formatNumberToIndianRupee( parseInt( $emiLoanAmount.val().replace( /[^\d\.]/g, "" ) ), { symbol: false } );
	$emiLoanAmount.val( formattedValue );
} )

$( ".js_emi_calculator [ name = 'tenure' ]" ).on( "input", calculateEMI )

$( ".js_emi_calculator [ name = 'interest-rate' ]" ).on( "input", calculateEMI )





/*
 *
 * Default UI state
 *
 */
$( document ).one( "load::spreadsheet", function ( event, workbook ) {

	var projectConstants = getProjectConstants( workbook );

	// EMI Tenure
	$( ".js_emi_content [ name = tenure ]" ).val( projectConstants[ "Loan Tenure" ] );
	// EMI Interest Rate
	$( ".js_emi_content [ name = interest-rate ]" ).val( projectConstants[ "Interest Rate" ] );

} );
