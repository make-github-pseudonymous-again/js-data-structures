var all, util, sort, random, itertools, functools;

util = require( "util" );
sort = require( "aureooms-js-sort" );
random = require( "aureooms-js-random" );
itertools = require( "aureooms-js-itertools" );
functools = require( "aureooms-js-functools" );

all = function ( tmpl_name, tmpl, diffname, diff, n ) {

	var name = util.format( "binary search tree (%s, %s, %d)", tmpl_name, diffname, n );

	console.log( name );

	test( name, function () {


		var SplayTree = tmpl(diff);
		var sample = random.__sample__(random.randint);
		var shuffle = random.__shuffle__(sample);

		var bt = new SplayTree();
		var a = [];

		var i = n, x;

		while ( i-- ) {
			x = Math.random();
			bt.insert(x);
			a.push(x);
		}

		a.sort( diff );

		var b = [], c = [], d, e, half = Math.floor(n/2);

		// CHECK CONTENT
		bt.in_order_traversal(function(v){ b.push(v); });
		deepEqual(b, a, "check content");


		// PREPARE FOR CHECKING PURPOSES
		i = n;
		while(i--) a[i] = [true, a[i]];


		// CHECK FIND SORTED
		i = n;
		while(i--){
			b[i] = bt.find(a[i][1]);
		}
		deepEqual(b, a, "check find sorted");

		// CHECK FIND SHUFFLED
		shuffle(a, 0, n);
		i = n;
		while (i--) b[i] = bt.find(a[i][1]);
		deepEqual(b, a, "check find shuffled");


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
			deepEqual(d, e, "check content " + txt);

			// CHECK FIND AFTER REMOVE
			i = n;
			while(i--){
				b[i] = bt.find(a[i][1])[0];
				c[i] = a[i][0];
			}

			deepEqual(b, c, "check find " + txt);

			// TRY REMOVING TWICE
			i = r;
			while(i --> l) bt.remove(a[i][1]);
		};

		remove(half, n, 0, half, "after remove half");

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
		deepEqual(d, e, "check content new elements");

		// CHECK FIND NEW ELEMENTS
		i = n;
		while (i--) b[i] = bt.find(a[i][1]);
		deepEqual(b, a, "check find new elements");

		remove(0, half, half, n,  "after remove first half");
		remove(half, n, 0, 0,  "after remove second half");

	});

};



itertools.product( [

[
	["splay_tree_t", algo.splay_tree_t],
	["splay_tree_2_t", algo.splay_tree_2_t],
	["splay_tree_3_t", algo.splay_tree_3_t],
	["splay_tree_4_t", algo.splay_tree_4_t],
	["splay_tree_5_t", algo.splay_tree_5_t],
],

[
	["increasing", sort.increasing],
	["decreasing", sort.decreasing]
],

[1, 16, 17, 31, 32, 33, 127, 128, 129]

], 1, [] ).forEach( functools.partial( functools.star, null, [all] ) );
