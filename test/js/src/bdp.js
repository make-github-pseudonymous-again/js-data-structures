

var all, one, itertools, functools, operator, array, sort, n, random, shuffle;

itertools = require( "aureooms-js-itertools" );
functools = require( "aureooms-js-functools" );
operator = require( "aureooms-js-operator" );
random = require( "aureooms-js-random" );
array = require( "aureooms-js-array" );
sort = require( "aureooms-js-sort" );

shuffle = random.__shuffle__( random.__sample__( random.randint ) );

one = function ( bdp, __f__, a, i, j, di, dj, expected ) {

	var out, i, outputordering;

	++n;

	shuffle( a, i, j );

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

		one(
			algo,
			__f__,
			[ [0, 0.5, 1], [0, 1, 2], [1, 1, 1], [1, 0.5, 2] ],
			0, 4,
			1, 3,
			[
				[ [1, 1, 1], [0, 0.5, 1] ],
				[ [1, 0.5, 2], [0, 0.5, 1] ]
			]
		);

		one(
			algo,
			__f__,
			[ [0, 0.5, 1], [0, 1, 2], [1, 1, 1], [1, 0.5, 2], [1, 1, 1], [1, 0.5, 2] ],
			0, 6,
			1, 3,
			[
				[ [1, 1, 1], [0, 0.5, 1] ],
				[ [1, 0.5, 2], [0, 0.5, 1] ],
				[ [1, 1, 1], [0, 0.5, 1] ],
				[ [1, 0.5, 2], [0, 0.5, 1] ]
			]
		);


		one(
			algo,
			__f__,
			[ [0, 0.5, 1], [0, 1, 2], [1, 1, 1], [1, 0.5, 2], [1, 1, 3], [1, 1, 2] ],
			0, 6,
			1, 3,
			[
				[ [1, 1, 1], [0, 0.5, 1] ],
				[ [1, 0.5, 2], [0, 0.5, 1] ],
				[ [1, 1, 3], [0, 0.5, 1] ],
				[ [1, 1, 2], [0, 0.5, 1] ],
				[ [1, 1, 3], [0, 1, 2] ],
				[ [1, 1, 2], [0, 1, 2] ]
			]
		);

		one(
			algo,
			__f__,
			[ [0, 0.5, 1], [0, 1, 2], [1, 1, 1], [1, 0.5, 2], [1, 1, 3], [0, 105, 1], [0, 1, 20], [1, 1, 2] ],
			0, 8,
			1, 3,
			[
				[ [1, 1, 1], [0, 0.5, 1] ],
				[ [1, 0.5, 2], [0, 0.5, 1] ],
				[ [1, 1, 3], [0, 0.5, 1] ],
				[ [1, 1, 2], [0, 0.5, 1] ],
				[ [1, 1, 3], [0, 1, 2] ],
				[ [1, 1, 2], [0, 1, 2] ]
			]
		);

		one(
			algo,
			__f__,
			[ [0, 0.5, 1], [0, 1, 2], [0, 105, 1], [0, 1, 20], [1, 105, 20], [1, 105, 20], [1, 106, 20] ],
			0, 7,
			1, 3,
			[
				[ [1, 105, 20], [0, 0.5, 1] ],
				[ [1, 105, 20], [0, 1, 2] ],
				[ [1, 105, 20], [0, 105, 1] ],
				[ [1, 105, 20], [0, 1, 20] ],
				[ [1, 105, 20], [0, 0.5, 1] ],
				[ [1, 105, 20], [0, 1, 2] ],
				[ [1, 105, 20], [0, 105, 1] ],
				[ [1, 105, 20], [0, 1, 20] ],
				[ [1, 106, 20], [0, 0.5, 1] ],
				[ [1, 106, 20], [0, 1, 2] ],
				[ [1, 106, 20], [0, 105, 1] ],
				[ [1, 106, 20], [0, 1, 20] ]
			]
		);

		one(
			algo,
			__f__,
			[ [0, 0.5, 1], [0, 1, 2], [0, 105, 1], [0, 1, 20], [1, 105, 20], [1, 105, 20], [1, 106, 20], [0, 107, 1], [0, 107, 1] ],
			0, 9,
			1, 3,
			[
				[ [1, 105, 20], [0, 0.5, 1] ],
				[ [1, 105, 20], [0, 1, 2] ],
				[ [1, 105, 20], [0, 105, 1] ],
				[ [1, 105, 20], [0, 1, 20] ],
				[ [1, 105, 20], [0, 0.5, 1] ],
				[ [1, 105, 20], [0, 1, 2] ],
				[ [1, 105, 20], [0, 105, 1] ],
				[ [1, 105, 20], [0, 1, 20] ],
				[ [1, 106, 20], [0, 0.5, 1] ],
				[ [1, 106, 20], [0, 1, 2] ],
				[ [1, 106, 20], [0, 105, 1] ],
				[ [1, 106, 20], [0, 1, 20] ]
			]
		);


	});

};

[
	[
		"algo.__bdpdc__",
		algo.__bdpdc__(
			sort.__quickselect__( sort.partition ), // select,
			functools.curry( function ( i, v, a ) { // __eq__,
				return + ( v === a[i] );
			}, 3 ),
			functools.curry( function ( i, v, a ) { // __ne__,
				return + ( v !== a[i] );
			}, 3 ),
			operator.itemgetter( 0 ),               // color,
			array.split,                            // split,
			array.swap                              // swap
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
