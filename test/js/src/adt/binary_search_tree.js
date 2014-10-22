var all, util, sort, random, itertools, functools, shuffle;

util = require( "util" );
sort = require( "aureooms-js-sort" );
random = require( "aureooms-js-random" );
itertools = require( "aureooms-js-itertools" );
functools = require( "aureooms-js-functools" );

shuffle = random.__shuffle__( random.__sample__( random.randint ) );

/**
 * tests the following methods
 *
 * bst.insert( value )
 * bst.in_order_traversal( cb ( value ) { ... } )
 * bst.find( value )
 * bst.remove( value )
 */

all = function ( BSTname, BST, diffname, diff, n ) {

	var title;

	title = util.format( "binary search tree (%s, %s, %d)", BSTname, diffname, n );

	console.log( title );


	test( title, function () {

		var SplayTree, bst, a, b, c, d, e, half, i, x, remove;

		SplayTree = BST( diff );
		bst = new SplayTree();

		a = [];
		i = n;

		while ( i-- ) {
			x = Math.random();
			bst.insert( x );
			a.push( x );
		}

		a.sort( diff );

		b = [];
		c = [];
		half = Math.floor( n / 2 );

		// CHECK CONTENT
		bst.in_order_traversal( function ( v ) { b.push( v ); } );
		deepEqual(b, a, "check content");


		// PREPARE FOR CHECKING PURPOSES
		i = n;
		while ( i-- ) {
			a[i] = [true, a[i]];
		}


		// CHECK FIND SORTED
		i = n;
		while ( i-- ) {
			b[i] = bst.find( a[i][1] );
		}
		deepEqual( b, a, "check find sorted" );

		// CHECK FIND SHUFFLED
		shuffle( a, 0, n );
		i = n;
		while ( i-- ) {
			b[i] = bst.find( a[i][1] );
		}
		deepEqual( b, a, "check find shuffled" );


		remove = function(l, r, p, q, txt){

			// REMOVE

			i = r;
			while ( i --> l ) {
				bst.remove( a[i][1] );
				a[i][0] = false;
			}


			// CHECK CONTENT AFTER REMOVE

			d = [];
			e = [];
			for ( i = p ; i < q ; ++i ) {
				e.push( a[i][1] );
			}

			e.sort( diff );
			bst.in_order_traversal( function ( v ) { d.push(v); } );
			deepEqual( d, e, "check content " + txt );


			// CHECK FIND AFTER REMOVE

			i = n;
			while ( i-- ) {
				b[i] = bst.find(a[i][1])[0];
				c[i] = a[i][0];
			}

			deepEqual( b, c, "check find " + txt );


			// TRY REMOVING TWICE

			i = r;
			while ( i --> l ) {
				bst.remove(a[i][1]);
			}

		};

		remove( half, n, 0, half, "after remove half" );

		// ADD NEW ELEMENTS
		i = n;
		while ( i --> half ) {
			x = Math.random();
			bst.insert( x );
			a[i] = [true, x];
		}

		// CHECK CONTENT NEW ELEMENTS

		d = [];
		e = [];
		for ( i = 0 ; i < n ; ++i ) {
			e.push( a[i][1] );
		}

		e.sort( diff );
		bst.in_order_traversal( function ( v ) { d.push(v); } );
		deepEqual( d, e, "check content new elements" );


		// CHECK FIND NEW ELEMENTS

		i = n;

		while ( i-- ) {
			b[i] = bst.find( a[i][1] );
		}

		deepEqual( b, a, "check find new elements" );


		remove( 0, half, half, n,  "after remove first half" );
		remove( half, n, 0, 0,  "after remove second half" );

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

], 1, [] ).forEach( functools.partial( functools.star, [all] ) );
