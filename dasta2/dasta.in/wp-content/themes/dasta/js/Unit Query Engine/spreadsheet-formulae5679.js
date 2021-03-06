
( function ( rootNamespace ) {

	/*
	 * Utility constants
	 */
	var error = new Error( '#ERROR!' );

	/*
	 * Utility functions
	 */
	var utils = { };

	utils.anyIsError = function anyIsError () {
		var n = arguments.length;
		while ( n-- ) {
			if ( arguments[ n ] instanceof Error ) {
				return true;
			}
		}
		return false;
	};

	utils.parseNumber = function parseNumber ( string ) {
		if ( string === undefined || string === "" ) {
			return error.value;
		}
		if ( ! isNaN( string ) ) {
			return parseFloat( string );
		}
		return error.value;
	};

	utils.argsToArray = function argsToArray ( args ) {
		var result = [ ];

		utils.arrayEach( args, function ( value ) {
			result.push( value );
		} );

		return result;
	};

	utils.arrayEach = function arrayEach ( array, iteratee ) {
		var index = -1, length = array.length;

		while ( ++index < length ) {
			if ( iteratee( array[ index ], index, array ) === false ) {
				break;
			}
		}

		return array;
	};

	utils.isFlat = function isFlat ( array ) {
		if ( ! array ) {
			return false;
		}

		for ( var i = 0; i < array.length; ++i ) {
			if ( Array.isArray( array[ i ] ) ) {
				return false;
			}
		}

		return true;
	};

	utils.flattenShallow = function flattenShallow ( array ) {
		if ( ! array || ! array.reduce ) {
			return array;
		}

		return array.reduce( function( a, b ) {
			var aIsArray = Array.isArray( a );
			var bIsArray = Array.isArray( b );

			if ( aIsArray && bIsArray ) {
				return a.concat( b );
			}
			if ( aIsArray ) {
				a.push( b );
				return a;
			}
			if ( bIsArray ) {
				return [ a ].concat( b );
			}

			return [ a, b ];
		} );
	};

	utils.flatten = function flatten () {
		var result = utils.argsToArray.apply( null, arguments );

		while ( ! utils.isFlat( result ) ) {
			result = utils.flattenShallow( result );
		}

		return result;
	};



	/*
	 * Formulae functions
	 */
	var formulae = { };


	formulae.CONCATENATE = function () {
		var args = utils.flatten( arguments );

		var trueFound = 0;
		while ( ( trueFound = args.indexOf( true ) ) > -1 ) {
			args[ trueFound ] = "TRUE";
		}

		var falseFound = 0;
		while ( ( falseFound = args.indexOf( false ) ) > -1 ) {
			args[ falseFound ] = "FALSE";
		}

		return args.join( "" );
	};

	formulae.ROUNDDOWN = function ( number, digits ) {
		number = utils.parseNumber( number );
		if ( digits === void 0 ) digits = 0;
		digits = utils.parseNumber(??digits );
		if ( utils.anyIsError( number, digits ) ) {
			return error.value;
		}
		var sign = ( number > 0 ) ? 1 : -1;
		return sign * ( Math.floor( Math.abs( number ) * Math.pow( 10, digits ) ) ) / Math.pow( 10, digits );
	}

	// stub
	formulae.TRANSPOSE = function ( ) {}





	rootNamespace.spreadsheetFormulae = formulae;

} )( window )
