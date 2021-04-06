
$( document ).ready( function () {

	isSmall = $( window ).width() <= 1024;

	if ( $( ".wrap section" ).first().hasClass( "white" ) ) {
		$( "header" ).addClass( "dark" );
	}

	$( ".counter" ).each( function () {
		$( this ).attr( "data-initial", $( this ).text() ).attr( "data-hascounted", "no" );
		$( this ).text( "0" );
	} );

	$( ".choice-list" ).each( function () {
		$( this ).find( "a" ).first().click();
	} );

	$( ".radio-switch" ).each( function () {
		$( this ).find( "input[type=radio]+label" ).first().click();
	} );

	// Hide all the contact form title options
	$( ".contact-form h1 > span" ).hide();
	$( ".contact-form h1 > span.contact-title" ).show();

} );





var dayOne=$(".day-switch").length>0,
	waterOn=$(".water-switch").length>0,
	animReady=$(".manual-anim").length>0;
if ( $(".day-switch").attr("data-also") )
	dayOne = false;
var noCountersLeft=false;

$( window ).scroll( function () {

	if ( $( window ).scrollTop() > 30 || isSmall ) {
		if ( ! $header.hasClass( "sticky" ) )
			$header.addClass( "sticky" );
	} else {
		if ( $header.hasClass( "sticky" ) )
			$header.removeClass( "sticky" );
	}

	if ( dayOne ) {
		if ( $( ".day-switch" ).offset().top - $( window ).scrollTop() < $( window ).height() * 0.85 ) {
			dayOne = false;
			$( ".day-switch" ).click();
		}
	}

	if ( waterOn ) {
		if ( $( ".water-switch" ).offset().top - $( window ).scrollTop() < $( window ).height() * 0.45 ) {
			waterOn = false;
			$( ".water-switch" ).click();
		}
	}

	var $countersToCount = $( ".counter" ).filter( "[ data-hascounted ]" );
	if ( ! noCountersLeft && $countersToCount.length === 0 )
		noCountersLeft = true;

	if ( ! noCountersLeft ) {
		$countersToCount.each( function () {
			if ( $( this ).offset().top - $( window ).scrollTop() < $( window ).height() * 0.95 ) {
				$( this ).removeAttr( "data-hascounted" );
				if ( $( this ).hasClass( "to-zero" ) ) {
					countToZero( $( this ), parseInt( $( this ).attr( "data-initial" ).replace( /,/g, "" ), 10 ), 0 );
				} else {
					countToNumber( $( this ), parseInt( $( this ).attr( "data-initial" ).replace( /,/g, '' ) ), { round: true } );
				}
			}
		} );
	}

	if ( animReady ) {
		if ( $( ".manual-anim" ).offset().top - $( window ).scrollTop() < $( window ).height() * 0.25 ) {
			var c = 0;
			$( ".manual-anim .layers img" ).each( function () {
				if ( c <= 0 ) {
					c += 1;
					return;
				}
				$( this )
					.css( "zIndex", c )
					.animate( {
						opacity: 0,
						top: ( -1 * 4.9 * ( c - 1 ) ) + "%"
					}, 0 )
					.delay( ( c - 1 ) * 600 )
					.animate( {
						opacity: 1 - c * 0.15,
						top: ( -1 * 4.9 * c ) + "%"
					}, "slow" )
				c += 1;
			} );
			animReady = false;
		}
	}

} );





/*
 *
 * Something Toggler
 *	Used in the Apartment page ( in the section at the top )
 *
 */
$( "*[ data-size ]" ).on( "change", function ( event ) {
	var $inputTarget = $( event.target );
	var $unitInfoContainer = $inputTarget.closest( ".price" );
	var area = $inputTarget.data( "size" );
	// If a `price` value is attached, animate to it
	if ( $inputTarget.data( "price" ) ) {
		var basicPriceAmount = parseInt( $inputTarget.data( "price" ), 10 );
		var $basicPrice = $unitInfoContainer.find( ".js_basic_price" );
		countToNumber( $basicPrice, basicPriceAmount, { round: true } )
	}
	// Update the area
	$unitInfoContainer.find( ".sft" ).text( area );
} );
// Another event handler that overlaps with certain "counter" event handlers
$( ".radio-switch input[ type = radio ]" ).on( "change", function ( event ) {

	var $inputTarget = $( event.target );
	if ( $inputTarget.is( "[ data-size ]" ) )
		return;

	countToNumber( $( "#" + $inputTarget.closest( ".radio-switch" ).attr( "data-counter" ) ), $inputTarget.val(), { round: true } );

} );
// Initialize the 3BHK Unit toggler to "East Entrance"
// Yes, it's messed up
$( document ).ready( function () {

	setTimeout( function () {
		$( "#3bhk-2" ).trigger( "click" );
	}, 1500 );

} )
