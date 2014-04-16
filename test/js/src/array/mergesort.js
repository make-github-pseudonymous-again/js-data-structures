var util = require('util');

var sorted = function(ctor, n, pred) {
	test(util.format("mergesort (new %s(%d), %s)", ctor.name, n, pred), function (assert) {

		// SETUP RANDOM
		var randint = neat.randint;
		var sample = neat.sample_t(randint);
		var shuffle = neat.shuffle_t(sample);
		var iota = neat.iota;

		// SETUP SORT
		var tapemerge = neat.tapemerge_t(pred);
		var mergesort = neat.mergesort_t(tapemerge);

		// SETUP ARRAY, DEST
		var a = new ctor(n);
		var d = new ctor(n);
		iota(a, 0, n, 0);

		// SORT ARRAY
		shuffle(a, 0, n);
		mergesort(a, 0, n, d, 0, n);

		// TEST PREDICATE
		var i = d.length;
		if(i > 1){
			while (--i) {
				if ( !pred(d[i-1], d[i]) ) {
					ok(false, 'ko, array not sorted');
					return;
				}
			}
		}

		ok(true, 'ok, array sorted');
	});
};

var PRED = [
	function(a, b){ return a <  b; },
	function(a, b){ return a <= b; },
	function(a, b){ return a >  b; },
	function(a, b){ return a >= b; }
];

var N = [0, 1, 2, 10, 100, 1000, 10000];

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
			sorted(CTOR[k], N[j], PRED[i]);
		}
	}
}

