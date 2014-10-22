var all, util, sort, itertools, functools;

util = require( "util" );
sort = require( "aureooms-js-sort" );
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
				["__BinomialHeap__", algo.__BinomialHeap__],
				["__LazyBinomialHeap__", algo.__LazyBinomialHeap__]
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
		["increasing", sort.increasing],
		["decreasing", sort.decreasing]
	],

	[1, 16, 17, 31, 32, 33, 127, 128, 129]

], 1, [] ).forEach( functools.partial( functools.star, [all] ) );
