
itertools = require( "aureooms-js-itertools" );
array = require( "aureooms-js-array" );

test( "iter", function () {

	var f, b, fe, be, n;

	f = [];
	b = [];
	fe = [];
	be = [];

	n = 10;

	array.iota( fe, 0, n, 0 );
	itertools.reversed( fe, be );

	algo.fiter( 0, n, f.push.bind(f) );
	algo.biter( 0, n, b.push.bind(b) );

	deepEqual( f, fe, "forward" );
	deepEqual( b, be, "backward" );

});
