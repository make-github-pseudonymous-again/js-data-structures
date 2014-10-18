

var all, one, functools, operator, array, sort;

functools = require( "aureooms-js-functools" );
operator = require( "aureooms-js-operator" );
array = require( "aureooms-js-array" );
sort = require( "aureooms-js-sort" );


one = function ( bdp, __f__, a, i, j, di, dj, expected ) {

	var out;

	out = bdp( __f__, a, i, j, di, dj, [] );

	deepEqual( out, expected, JSON.stringify( [] ) );

};

all = function ( name, algo ) {

	test( "name", function ( ) {

		var f;

		f = function ( i, a, b ) {
			return a[i] - b[i];
		};


		one(
			algo,
			functools.curry( f, 3 ),
			[ [0], [0], [1], [1] ],
			0, 4,
			1, 1,
			[
				[ [1], [0] ],
				[ [1], [0] ],
				[ [1], [0] ],
				[ [1], [0] ]
			]
		);


	});

};

[
	[
		"algo.__bdpdc__",
		algo.__bdpdc__(
			sort.quickselect,                  // select,
			functools.curry( operator.eq, 2 ), // __eq__,
			functools.curry( operator.ne, 2 ), // __ne__,
			operator.itemgetter( 0 ),          // color,
			array.split,                       // split,
			array.swap                         // swap
		)
	],

	[
		"algo.__bdpdn2__",
		algo.__bdpdn2__(
			operator.itemgetter( 0 ),          // color,
			array.split                        // split
		)
	]

].forEach( functools.partial( functools.star, null, [all] ) );
