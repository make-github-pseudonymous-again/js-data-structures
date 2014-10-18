

var all, one, itertools, functools, operator, array, sort, n;

itertools = require( "aureooms-js-itertools" );
functools = require( "aureooms-js-functools" );
operator = require( "aureooms-js-operator" );
array = require( "aureooms-js-array" );
sort = require( "aureooms-js-sort" );

one = function ( bdp, __f__, a, i, j, di, dj, expected ) {

	var out, i, outputordering;

	++n;

	out = bdp( __f__, a, i, j, di, dj, [] );

	outputordering = sort.lexicographical( sort.lexicographical( sort.increasing ) );

	array.sort( outputordering, out );
	array.sort( outputordering, expected );

	deepEqual( out, expected, n );

};

all = function ( name, algo ) {

	n = 0;

	test( name, function ( ) {

		var f, __f__;

		f = function ( i, a, b ) {
			return a[i] - b[i];
		};

		__f__ = functools.curry( f, 3 );

		one( algo, __f__, [], 0, 0, 1, 1, [] );

		one( algo, __f__, [ [0] ], 0, 1, 1, 1, [] );

		one( algo, __f__, [ [1] ], 0, 1, 1, 1, [] );

		one( algo, __f__, [ [0], [0], [0], [0] ], 0, 4, 1, 1, [] );

		one( algo, __f__, [ [1], [1], [1], [1] ], 0, 4, 1, 1, [] );

		one(
			algo,
			__f__,
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

		one(
			algo,
			__f__,
			[ [0, 0.5], [0, 1], [1, 1], [1, 0.5] ],
			0, 4,
			1, 2,
			[
				[ [1, 1], [0, 1] ],
				[ [1, 1], [0, 0.5] ],
				[ [1, 0.5], [0, 0.5] ]
			]
		);


	});

};

[
	[
		"algo.__bdpdc__",
		algo.__bdpdc__(
			sort.__quickselect__( sort.hoare ), // select,
			functools.curry( operator.eq, 2 ),  // __eq__,
			functools.curry( operator.ne, 2 ),  // __ne__,
			operator.itemgetter( 0 ),           // color,
			array.split,                        // split,
			array.swap                          // swap
		)
	],

	[
		"algo.__bdpdn2__",
		algo.__bdpdn2__(
			operator.itemgetter( 0 ),           // color,
			array.split                         // split
		)
	]

].forEach( functools.partial( functools.star, null, [all] ) );
