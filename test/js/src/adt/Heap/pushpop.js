var all, util, compare, itertools, functools;

util = require( "util" );
compare = require( "aureooms-js-compare" );
itertools = require( "aureooms-js-itertools" );
functools = require( "aureooms-js-functools" );

all = function ( heapname, Heap, diffname, diff, n ) {

	var title = util.format( "Heap pushpop (%s, %s, %d)", heapname, diffname, n );

	console.log( title );

	test( title, function () {

		var q, a, i, x, b;

		q = Heap( diff );
		a = [];

		i = n;
		while ( i-- ) {
			x = Math.random();
			q.push(x);
			a.push(x);
		}

		a.sort(diff);

		i = n;
		b = [];

		while ( i-- ) {
			b.push( q.pop() );
		}

		deepEqual( b, a, "check sorted" );

		deepEqual( q.pop(), undefined, "2nd empty pop" );

		if ( q.list !== undefined ) {
			deepEqual( q.list.length, 0, "list empty" );
		}
		else if ( q.array !== undefined ) {
			deepEqual( q.array.length, 0, "array empty" );
		}

		deepEqual( q.length, 0, "queue empty" );

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
				["__BinomialHeap__", datastructures.__BinomialHeap__],
				["__LazyBinomialHeap__", datastructures.__LazyBinomialHeap__]
			],

			[
				["BinomialTree", datastructures.BinomialTree],
				["BinomialTreeWithParent", datastructures.BinomialTreeWithParent]
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
							functools.create, [datastructures.DAryHeapWithoutReferences]
						),
						2
					)
				],
				[
					"DAryHeap",
					functools.curry(
						functools.partial(
							functools.create, [datastructures.DAryHeap]
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

	[1, 2, 3, 31, 32, 33, 63, 64, 65]

], 1, [] ).forEach( functools.partial( functools.star, [all] ) );
