var all, util, sort, itertools, functools;

util = require( "util" );
sort = require( "aureooms-js-sort" );
itertools = require( "aureooms-js-itertools" );
functools = require( "aureooms-js-functools" );

all = function ( heapname, __BinomialHeap__, treename, BinomialTree, diffname, diff, n ) {

	var title = util.format( "Binomial Heap head reference (%s, %s, %s, %d)", heapname, treename, diffname, n );

	console.log( title );

	test( title, function () {

		var BinomialHeap, q, a, i, x, b;

		BinomialHeap = __BinomialHeap__( BinomialTree );

		q = new BinomialHeap( diff );
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
			b.push( q.headreference().value );
			q.pop();
		}

		a.sort( diff );

		deepEqual( b, a, "check head reference sorted" );
		deepEqual( q.headreference(), null, "check head reference empty" );

	});

};





itertools.product( [

[
	["__BinomialHeap__", algo.__BinomialHeap__],
	// ["__LazyBinomialHeap__", algo.__LazyBinomialHeap__]
],

[
	["BinomialTree", algo.BinomialTree],
	["BinomialTreeWithParent", algo.BinomialTreeWithParent]
],

[
	["increasing", sort.increasing],
	["decreasing", sort.decreasing]
],

[1, 16, 17, 31, 32, 33, 127, 128, 129]

], 1, [] ).forEach( functools.partial( functools.star, [all] ) );
