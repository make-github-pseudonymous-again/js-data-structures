var all, util, compare, itertools, functools;

util = require( "util" );
compare = require( "aureooms-js-compare" );
itertools = require( "aureooms-js-itertools" );
functools = require( "aureooms-js-functools" );

all = function ( heapname, Heap, diffname, diff, n ) {

	var title = util.format( "Heap head (%s, %s, %d)", heapname, diffname, n );

	console.log( title );

	test( title, function () {

		var q, a, i, x, b;

		q = new Heap( diff );
		a = [];

		i = n;

		while ( i-- ) {
			x = Math.random();
			q.push(x);
			a.push(x);
		}

		i = n;
		b = [];

		while ( i-- ) {
			b.push( q.head() );
			q.pop();
		}

		a.sort( diff );

		deepEqual( b, a, "check head sorted" );
		deepEqual( q.head(), undefined, "check head empty" );

	});

};





itertools.product( [

	itertools.chain( [

		itertools.map( functools.partial( functools.star,

			function ( heapname, template, treename, treeconstructor ) {

				return [
					heapname + ", " + treename,
					functools.partial( functools.create,
						[template( treeconstructor )]
					)
				];

			} ),

			itertools.product( [

			[
				["__BinomialHeap__", algo.__BinomialHeap__],
				// ["__LazyBinomialHeap__", algo.__LazyBinomialHeap__]
			],

			[
				["BinomialTree", algo.BinomialTree],
				["BinomialTreeWithParent", algo.BinomialTreeWithParent]
			]

			], 1, [] ),

			[]

		),


		itertools.map( functools.partial( functools.star,

			function ( heapname, template, arityname, arity ) {

				return [
					heapname + ", " + arityname,
					template( arity )
				];

			} ),

			itertools.product( [

			[
				[
					"DAryHeapWithoutReferences",
					functools.curry(
						functools.partial(
							functools.create, [algo.DAryHeapWithoutReferences]
						),
						2
					)
				],
				[
					"DAryHeap",
					functools.curry(
						functools.partial(
							functools.create, [algo.DAryHeap]
						),
						2
					)
				]
			],

			[
				["unary", 1],
				["binary", 2],
				["ternary", 3],
				["4-ary", 4],
				["5-ary", 5]
			],

			], 1, [] ),

			[]

		),

	], [] ),

	[
		["increasing", compare.increasing],
		["decreasing", compare.decreasing]
	],

	[1, 16, 17, 31, 32, 33, 127, 128, 129]

], 1, [] ).forEach( functools.partial( functools.star, [all] ) );
