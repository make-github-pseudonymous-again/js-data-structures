var all, util, sort, itertools, functools;

util = require( "util" );
sort = require( "aureooms-js-sort" );
itertools = require( "aureooms-js-itertools" );
functools = require( "aureooms-js-functools" );

all = function ( heapname, __BinomialHeap__, treename, BinomialTree, diffname, diff, m, n ) {

	var title = util.format( "Binomial Heap merge (%s, %s, %s, %d, %d)", heapname, treename, diffname, m, n );

	console.log( title );

	test( title, function () {

		var BinomialHeap, q, q1, q2, a, x, i, b;

		BinomialHeap = __BinomialHeap__( BinomialTree );

		a = [];
		q = new BinomialHeap( diff );
		q1 = new BinomialHeap( diff );
		q2 = new BinomialHeap( diff );

		deepEqual( q.pop(), undefined, "1st empty pop" );

		i = m;
		while ( i-- ) {
			x = Math.random();
			q1.push(x);
			a.push(x);
		}

		i = n;
		while ( i-- ) {
			x = Math.random();
			q2.push(x);
			a.push(x);
		}

		a.sort( diff );

		q.merge( q1 );
		q.merge( q2 );

		i = m + n;
		b = [];

		while ( i-- ) {
			b.push( q.pop() );
		}

		deepEqual( b, a, "check sorted" );

		deepEqual( q.pop(), undefined, "2nd empty pop" );
		deepEqual( q.list.length, 0, "list empty" );
		deepEqual( q.length, 0, "queue empty" );

	});

};


itertools.product( [

[
	["__BinomialHeap__", algo.__BinomialHeap__],
	["__LazyBinomialHeap__", algo.__LazyBinomialHeap__]
],

[
	["BinomialTree", algo.BinomialTree],
	["BinomialTreeWithParent", algo.BinomialTreeWithParent]
],

[
	["increasing", sort.increasing],
	["decreasing", sort.decreasing]
],

[1, 16, 17, 31, 32, 33, 127, 128, 129],
[1, 16, 17, 31, 32, 33, 127, 128, 129]

], 1, [] ).forEach( functools.partial( functools.star, null, [all] ) );
