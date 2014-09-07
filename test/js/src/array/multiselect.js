var util = require('util');

var check = function(ctor, n, pred) {
	var name = util.format("multiselect (new %s(%d), %s)", ctor.name, n, pred);
	console.log(name);
	test(name, function (assert) {

		// SETUP RANDOM
		var randint = algo.randint;
		var sample = algo.sample_t(randint);
		var shuffle = algo.shuffle_t(sample);
		var iota = algo.iota;
		var copy = algo.copy;

		// SETUP INDEX SEARCH
		var index_diff = function(a, b){ return a - b; };
		var binarysearch_t = algo.binarysearch_tt(algo.pivotsearch_t);
		var binarysearch = binarysearch_t(index_diff);
		var index_pred = function(a, b){ return index_diff(a, b) < 0};
		var index_partition = algo.partition_t(index_pred);
		var index_quicksort = algo.quicksort_t(index_partition);

		// SETUP SORT
		var partition = algo.partition_t(pred);
		var quicksort = algo.quicksort_t(partition);
		var multiselect = algo.multiselect_t(partition, binarysearch);

		// SETUP REF ARRAY
		var ref = new ctor(n);
		iota(ref, 0, n, 0);
		shuffle(ref, 0, n);
		quicksort(ref, 0, n);

		// SETUP TEST ARRAY
		var a = new ctor(n);
		copy(ref, 0, n, a, 0);

		// TEST PREDICATE
		var i = a.length;
		
		var len = randint(0, i + 1);
		sample(len, a, 0, n);
		var k = new ctor(len);
		copy(a, 0, len, k, 0);
		index_quicksort(k, 0, len);

		shuffle(a, 0, n);
		multiselect(k, 0, len, a, 0, n);
		while(len--){
			deepEqual(a[k[len]], ref[k[len]], 'select #' + k[len]);
		}

		deepEqual(a.length, n, 'check length');
	});
};

var PRED = [
	function(a, b){ return a <  b; },
	function(a, b){ return a <= b; },
	function(a, b){ return a >  b; },
	function(a, b){ return a >= b; }
];

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
		for (var i = 0; i < PRED.length; ++i) {
			check(CTOR[k], N[j], PRED[i]);
		}
	}
}

