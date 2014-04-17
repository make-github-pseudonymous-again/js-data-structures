var util = require('util');

var check = function(ctor, n, pred, diff) {
	var name = util.format("merge (new %s(%d), %s)", ctor.name, n, diff);
	console.log(name);
	test(name, function (assert) {

		// SETUP RANDOM
		var randint = neat.randint;
		var sample = neat.sample_t(randint);
		var shuffle = neat.shuffle_t(sample);

		// SETUP UTILS
		var iota = neat.iota;
		var copy = neat.copy;

		// SETUP SORT
		var binarysearch_t = neat.binarysearch_tt(neat.pivotsearch_t);
		var binarysearch = binarysearch_t(diff);
		var partition = neat.partition_t(pred);
		var quicksort = neat.quicksort_t(partition);
		var merge = neat.merge_t(binarysearch, copy);

		// SETUP ARRAYS, DEST
		var a = new ctor(n);
		for(var j = 0; j < n; ++j) a[j] = randint(0, n);
		shuffle(a, 0, n);
		quicksort(a, 0, n);

		var b = new ctor(n);
		for(var j = 0; j < n; ++j) b[j] = randint(0, n);
		shuffle(b, 0, n);
		quicksort(b, 0, n);

		var d = new ctor(2*n);

		// MERGE ARRAYS
		merge(a, 0, n, b, 0, n, d, 0);

		// TEST PREDICATE
		var i = d.length;
		var sorted = true;
		if(i > 1){
			while (--i) {
				if ( pred(d[i], d[i-1]) ) {
					sorted = false;
					break;
				}
			}
		}

		ok(sorted, 'check sorted');
		deepEqual(a.length, n, 'check length a');
		deepEqual(b.length, n, 'check length b');
		deepEqual(d.length, 2*n, 'check length d');
	});
};

var DIFF = [
	function(a, b){ return a - b; },
	function(a, b){ return b - a; }
];

var PRED = [];

for(var i = 0; i < DIFF.length; ++i){
	PRED.push(function(a, b){ return DIFF[i](a, b) < 0; });
}

var N = [0, 1, 2, 10, 63, 64, 65];

var CTOR = [
	Array,
	Int8Array,
	Uint8Array,
	Int16Array,
	Uint16Array,
	Int32Array,
	Uint32Array,
	Float32Array,
	Float64Array
];

for (var k = 0; k < CTOR.length; k++) {
	for (var j = 0; j < N.length; j++) {
		if(CTOR[k].BYTES_PER_ELEMENT &&
			N[j] > Math.pow(2, CTOR[k].BYTES_PER_ELEMENT * 8)){
				continue;
		}
		for (var i = 0; i < DIFF.length; ++i) {
			check(CTOR[k], N[j], PRED[i], DIFF[i]);
		}
	}
}

