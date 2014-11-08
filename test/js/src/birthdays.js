
var run, compare;

compare = algo.__absepsilon__( 1e-4 );

run = function ( k, n, days, expected ) {

	var computed;

	computed = algo.samebirthday( k, n, days );

	equal( compare( computed, expected ), 0, k + ", " + n + ", " + days + " : " + computed );

};


test( "birthdays", function () {

	run( 1, 3, 365, 1 - ( 364 / 365 * 364 / 365 ) );
	run( 2, 3, 365, 1 - ( 364 / 365 * 363 / 365 ) );
	run( 10, 10, 365, 0.1169 );
	run( 23, 23, 365, 0.5073 );
	run( 50, 50, 365, 0.9704 );
	run( 100, 100, 365, 1 - 3.072e-7 );
	run( 365, 365, 365, 0.9999 );

} );
