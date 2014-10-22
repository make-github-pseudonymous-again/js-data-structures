var all, util, sort, itertools, functools, random, shuffle;

util = require( "util" );
sort = require( "aureooms-js-sort" );
random = require( "aureooms-js-random" );
itertools = require( "aureooms-js-itertools" );
functools = require( "aureooms-js-functools" );

shuffle = random.__shuffle__( random.__sample__( random.randint ) );

all = function ( heapname, __BinomialHeap__, treename, BinomialTree, diffname, diff, n ) {

	var title = util.format( "Binomial Heap decreasekey (%s, %s, %s, %d)", heapname, treename, diffname, n );

	console.log( title );

	test( title, function () {

		var BinomialHeap, q, a, reference, references, i, x, b;

		BinomialHeap = __BinomialHeap__( BinomialTree );

		q = new BinomialHeap( diff );
		a = [];
		b = [];
		references = [];

		i = n;
		while ( i-- ) {
			x = Math.random();
			reference = q.push( x );
			references.push( reference );
			a.push( x );
		}

		shuffle( references, 0, n );

		for ( i = 0 ; i < n ; ++i ) {

			a[i] -= Math.random();
			q.decreasekey( references[i], a[i] );

		}

		i = n;

		while ( i-- ) {

			b.push( q.pop() );

		}

		a.sort( diff );
		b.sort( diff );

		deepEqual( b, a, "check identical");

		deepEqual( q.length, 0, "check length empty");
		deepEqual( q.list.length, 0, "check list length empty");
		deepEqual( q.head(), undefined, "check head empty");
		deepEqual( q.headreference(), null, "check headreference empty");
		deepEqual( q.pop(), undefined, "check pop empty");
		deepEqual( q.popreference(), null, "check popreference empty");

	});

};


itertools.product( [

[
	["__BinomialHeap__", algo.__BinomialHeap__],
	// ["__LazyBinomialHeap__", algo.__LazyBinomialHeap__]
],

[
	// ["BinomialTree", algo.BinomialTree],
	["BinomialTreeWithParent", algo.BinomialTreeWithParent]
],

[
	["increasing", sort.increasing]
],

[1, 16, 17, 31, 32, 33, 127, 128, 129]

], 1, [] ).forEach( functools.partial( functools.star, [all] ) );
