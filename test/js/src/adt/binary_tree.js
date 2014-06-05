var util = require('util');

var check = function(tmpl_name, tmpl, diff, n){

	var name = util.format("binary tree (%s, %s, %d)", tmpl_name, diff, n);

	console.log(name);

	test(name, function(assert){


		var SplayTree = tmpl(diff);
		var sample = algo.sample_t(algo.randint);
		var shuffle = algo.shuffle_t(sample);

		var bt = new SplayTree();
		var a = [];

		var i = n, x;
		while(i--){
			x = Math.random();
			bt.insert(x);
			a.push(x);
		}

		a.sort(diff);

		var b = [], c = [], d, e, half = Math.floor(n/2);

		// CHECK CONTENT
		bt.in_order_traversal(function(v){ b.push(v); });
		deepEqual(b, a, 'check content');


		// PREPARE FOR CHECKING PURPOSES
		i = n;
		while(i--) a[i] = [true, a[i]];


		// CHECK FIND SORTED
		i = n;
		while(i--){
			b[i] = bt.find(a[i][1]);
		}
		deepEqual(b, a, 'check find sorted');

		// CHECK FIND SHUFFLED
		shuffle(a, 0, n);
		i = n;
		while (i--) b[i] = bt.find(a[i][1]);
		deepEqual(b, a, 'check find shuffled');


		var remove = function(l, r, p, q, txt){
			// REMOVE
			i = r;
			while(i --> l){
				bt.remove(a[i][1]);
				a[i][0] = false;
			}

			// CHECK CONTENT AFTER REMOVE
			d = [];
			e = [];
			for(i = p; i < q; ++i) e.push(a[i][1]);
			e.sort(diff);
			bt.in_order_traversal(function(v){ d.push(v); });
			deepEqual(d, e, 'check content ' + txt);

			// CHECK FIND AFTER REMOVE
			i = n;
			while(i--){
				b[i] = bt.find(a[i][1])[0];
				c[i] = a[i][0];
			}

			deepEqual(b, c, 'check find ' + txt);

			// TRY REMOVING TWICE
			i = r;
			while(i --> l) bt.remove(a[i][1]);
		};

		remove(half, n, 0, half, 'after remove half');

		// ADD NEW ELEMENTS
		i = n;
		while(i --> half){
			x = Math.random();
			bt.insert(x);
			a[i] = [true, x];
		}

		// CHECK CONTENT NEW ELEMENTS
		d = [];
		e = [];
		for(i = 0; i < n; ++i) e.push(a[i][1]);
		e.sort(diff);
		bt.in_order_traversal(function(v){ d.push(v); });
		deepEqual(d, e, 'check content new elements');

		// CHECK FIND NEW ELEMENTS
		i = n;
		while (i--) b[i] = bt.find(a[i][1]);
		deepEqual(b, a, 'check find new elements');

		remove(0, half, half, n,  'after remove first half');
		remove(half, n, 0, 0,  'after remove second half');

	});

};



I = [
	['splay_tree_t', algo.splay_tree_t]
];

var DIFF = [
	function(a, b){ return a - b; },
	function(a, b){ return b - a; }
];


SIZE = [1, 16, 17, 31, 32, 33, 127, 128, 129];


for(var i = 0; i < I.length; ++i){
	for(var j = 0; j < DIFF.length; ++j){
		for(var k = 0; k < SIZE.length; ++k){
			check(I[i][0], I[i][1], DIFF[j], SIZE[k]);
		}
	}
}