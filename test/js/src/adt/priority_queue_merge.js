var util, array, sort;

util = require( "util" );
array = require ( "aureooms-js-array" );
sort = require( "aureooms-js-sort" );

var check = function(tmpl_name, tmpl, pred, n, diff){

	var name = util.format("priority queue merge (%s, %s, %d)", tmpl_name, diff, n);

	test( name, function(assert){

		var PriorityQueue, q, q1, q2, a, x, i, b;

		PriorityQueue = tmpl(pred, array.__opt__);

		a = [];
		q = new PriorityQueue();
		q1 = new PriorityQueue();
		q2 = new PriorityQueue();

		i = n;
		while ( i-- ) {

			x = Math.random();
			q1.push(x);
			a.push(x);

			x = Math.random();
			q2.push(x);
			a.push(x);
		}

		a.sort( diff );

		q.merge( q1 );
		q.merge( q2 );

		i = 2 * n;
		b = [];

		while ( i-- ) {
			b.push( q.pop() );
		}

		deepEqual(b, a, 'check sorted');

	});

};



I = [
	['lazy_binomial_queue_t', algo.lazy_binomial_queue_t],
	['binomial_queue_t', algo.binomial_queue_t],
];

var DIFF = [
	sort.increasing,
	sort.decreasing
];

var PRED = [];

for(var d = 0; d < DIFF.length; ++d){
	(function(d){
		PRED.push(function(a, b){ return DIFF[d](a, b) < 0; });
	})(d);
}

SIZE = [1, 16, 17, 31, 32, 33, 127, 128, 129];


for(var i = 0; i < I.length; ++i){
	for(var j = 0; j < PRED.length; ++j){
		for(var k = 0; k < SIZE.length; ++k){
			check(I[i][0], I[i][1], PRED[j], SIZE[k], DIFF[j]);
		}
	}
}
