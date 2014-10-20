var util, sort, itertools, functools;

util = require( "util" );
sort = require( "aureooms-js-sort" );
itertools = require( "aureooms-js-itertools" );
functools = require( "aureooms-js-functools" );

var check = function ( name, __BinomialHeap__, diff, n ) {

	var title = util.format("priority queue (%s, %s, %d)", name, diff, n);

	test( title, function(assert){

		var PriorityQueue = __BinomialHeap__( diff );

		var q = new PriorityQueue();
		var a = [];

		var i = n;
		while ( i-- ) {
			var x = Math.random();
			q.push(x);
			a.push(x);
		}

		a.sort(diff);

		i = n;
		var b = [];

		while ( i-- ) {
			b.push( q.pop() );
		}

		deepEqual(b, a, 'check sorted');

	});

};


itertools.product( [

[
	['lazy_binomial_queue_t', algo.lazy_binomial_queue_t],
	['binomial_queue_t', algo.binomial_queue_t],
],

[
	sort.increasing,
	sort.decreasing
],

[1, 16, 17, 31, 32, 33, 127, 128, 129]

], 1, [] ).forEach( functools.partial( functools.star, null, [check] ) );
