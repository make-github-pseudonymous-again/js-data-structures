var util, sort, itertools, functools;

util = require( "util" );
sort = require( "aureooms-js-sort" );
itertools = require( "aureooms-js-itertools" );
functools = require( "aureooms-js-functools" );

var check = function ( name, __BinomialHeap__, diff, m, n ) {

	var title = util.format( "priority queue merge (%s, %s, %d, %d)", name, diff, m, n );

	console.log( title );

	test( title, function () {

		var PriorityQueue, q, q1, q2, a, x, i, b;

		PriorityQueue = __BinomialHeap__( diff );

		a = [];
		q = new PriorityQueue();
		q1 = new PriorityQueue();
		q2 = new PriorityQueue();

		deepEqual(q.pop(), undefined, '1st empty pop');

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

		deepEqual(b, a, 'check sorted');

		deepEqual(q.pop(), undefined, '2nd empty pop');
		deepEqual(q.list.length, 0, 'list empty');

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

[1, 16, 17, 31, 32, 33, 127, 128, 129],
[1, 16, 17, 31, 32, 33, 127, 128, 129]

], 1, [] ).forEach( functools.partial( functools.star, null, [check] ) );
