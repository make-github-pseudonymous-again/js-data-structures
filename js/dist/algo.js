(function(exports, undefined){

	'use strict';


/* js/src/3sum */
/* js/src/3sum/_3sum_n2.js */


/**
 * Hypothesis :
 *   - A is sorted in increasing order
 *   - B is sorted in increasing order
 *   - |A| > 0
 *   - |B| > 0
 */

var _3sum_n2 = function (A, ai, aj, B, bi, bj, C, ci, cj, fn) {

	var hi, lo, a, b, c, v;

	for (; ci < cj; ++ci) {
		lo = ai;
		hi = bj - 1;

		do {

			a = A[lo];
			b = B[hi];
			c = C[ci];
			v = a + b;

			if (-c === v) fn(a, b, c);

			if (-c < v) --hi;
			else ++lo;

		} while (lo < aj && hi >= bi);
	}

};

exports._3sum_n2 = _3sum_n2;
/* js/src/4sum */
/* js/src/4sum/sortxy_n3.js */

/**
 * X is sorted in increasing order
 * Y is sorted in increasing order
 * compare takes 4 arguments and returns <=> 0
 * output takes 4 arguments
 *
 */
var sortxy_n3 = function ( compare , X , Y ,  Xi1 , Xj1 , Yi1 , Yj1 , Xi2 , Xj2 , Yi2 , Yj2 , output ) {

	var a , b , c , d , s ;

	if ( Xi1 > Xj1 || Yi1 > Yj1 || Xi2 > Xj2 || Yi2 > Yj2 ) {
		return ;
	}

	//  -----------------------------
	// |              X              |
	//  -----------------------------
	// Xi                           Xj

	//  -----------------------------
	// |              Y              |
	//  -----------------------------
	// Yi                           Yj

	a = X[Xi1] ;
	b = Y[Yj1] ;
	c = X[Xj2] ;
	d = Y[Yi2] ;

	s = compare( a , b , c , d ) ;

	if ( s === 0 ) {

		output( Xi1 , Yj1 , Xj2 , Yi2 ) ;

		sortxy_n3( compare , X , Y , Xi1 + 1 , Xj1 , Yi1 , Yj1 , Xi2 , Xj2 , Yi2 , Yj2 , output ) ;
		sortxy_n3( compare , X , Y , Xi1 , Xi1 , Yi1 , Yj1 - 1 , Xi2 , Xj2 , Yi2 , Yj2 , output ) ;
		sortxy_n3( compare , X , Y , Xi1 , Xi1 , Yj1 , Yj1 , Xi2 , Xj2 - 1 , Yi2 , Yj2 , output ) ;

	}

	else if ( s < 0 ) {

		sortxy_n3( compare , X , Y , Xi1 + 1 , Xj1 , Yi1 , Yj1 , Xi2 , Xj2 , Yi2 , Yj2 , output ) ;
		sortxy_n3( compare , X , Y , Xi1 , Xi1 , Yi1 , Yj1 , Xi2 , Xj2 - 1 , Yi2 , Yj2 , output ) ;

	}

	else {

		sortxy_n3( compare , X , Y , Xi1 , Xj1 , Yi1 , Yj1 - 1 , Xi2 , Xj2 , Yi2 , Yj2 , output ) ;
		sortxy_n3( compare , X , Y , Xi1 , Xj1 , Yj1 , Yj1 , Xi2 , Xj2 , Yi2 + 1 , Yj2 , output ) ;

	}


} ;

exports.sortxy_n3 = sortxy_n3 ;

/* js/src/4sum/sortxy_n4.js */

/**
 * X is sorted in increasing order
 * Y is sorted in increasing order
 * compare takes 4 arguments and returns <=> 0
 * output takes 4 arguments
 *
 */
var sortxy_n4 = function ( compare , X , Y ,  Xi1 , Xj1 , Yi1 , Yj1 , Xi2 , Xj2 , Yi2 , Yj2 , output ) {

	var a , b , c , d , s ;

	if ( Xi1 > Xj1 || Yi1 > Yj1 || Xi2 > Xj2 || Yi2 > Yj2 ) {
		return ;
	}

	//  -----------------------------
	// |              X              |
	//  -----------------------------
	// Xi                           Xj

	//  -----------------------------
	// |              Y              |
	//  -----------------------------
	// Yi                           Yj

	a = X[Xi1] ;
	b = Y[Yi1] ;
	c = X[Xi2] ;
	d = Y[Yi2] ;

	s = compare( a , b , c , d ) ;

	if ( s === 0 ) {

		output( Xi1 , Yi1 , Xi2 , Yi2 ) ;

	}

	sortxy_n4( compare , X , Y , Xi1 + 1 , Xj1 , Yi1 , Yj1 , Xi2 , Xj2 , Yi2 , Yj2 , output ) ;
	sortxy_n4( compare , X , Y , Xi1 , Xi1 , Yi1 + 1 , Yj1 , Xi2 , Xj2 , Yi2 , Yj2 , output ) ;
	sortxy_n4( compare , X , Y , Xi1 , Xi1 , Yi1 , Yi1 , Xi2 + 1 , Xj2 , Yi2 , Yj2 , output ) ;
	sortxy_n4( compare , X , Y , Xi1 , Xi1 , Yi1 , Yi1 , Xi2 , Xi2 , Yi2 + 1 , Yj2 , output ) ;

} ;

exports.sortxy_n4 = sortxy_n4 ;

/* js/src/adt */
/* js/src/adt/BinomialHeap */
/* js/src/adt/BinomialHeap/BinomialHeap.js */
var __BinomialHeap__ = function ( BinomialTree ) {

	var binomial_heap_push = function ( predicate, list, tree, rank ) {

		var i, len;

		// ensures list has at least rank cells

		i = rank - list.length;

		while ( i --> 0 ) {
			list.push( null );
		}

		// loop invariant
		// tree and list[i] have the same rank

		len = list.length;

		for ( i = rank ; i < len && list[i] !== null ; ++i ) {

			// there is already a tree with this rank

			tree = tree.merge( predicate, list[i] );
			list[i] = null;

		}

		// do not forget to append null if
		// we are lacking space

		if ( i === len ) {
			list.push( null );
		}

		// cell is empty
		// we can just put the new tree here

		list[i] = tree;

	};


	var merge = function ( predicate, list, other ) {

		var i, len, carry;

		if ( other.length === 0 ) {
			return;
		}

		// merging two binomial heaps is like
		// adding two little endian integers
		// so, we first make sure that we have
		// enough place to store the result

		i = other.length - list.length;

		while ( i --> 0 ) {
			list.push( null );
		}

		carry = null;

		len = list.length;

		// remember len >= other.length

		for ( i = 0 ; i < len ; ++i ) {

			// other[i] can be either null or not
			// list[i] can be either null or not
			// carry can be either null or not
			// --> 2^3 = 8 possibilities
			//
			//    null ? | other[i] | list[i] | carry
			// ---------------------------------------
			//     (0)   |    no    |     no  |   no
			//     (1)   |    no    |     no  |  yes
			//     (2)   |    no    |    yes  |   no
			//     (3)   |    no    |    yes  |  yes
			//     (4)   |   yes    |     no  |   no
			//     (5)   |   yes    |     no  |  yes
			//     (6)   |   yes    |    yes  |   no
			//     (7)   |   yes    |    yes  |  yes

			if ( i >= other.length || other[i] === null ) {

				if ( carry !== null ) {


					// (6) other[i] = null and list[i] = null and carry != null
					// --> put carry in current cell

					if ( list[i] === null ) {
						list[i] = carry;
						carry = null;
					}


					// (4) other[i] = null and list[i] != null and carry != null
					// --> merge carry with current cell

					else {
						carry = carry.merge( predicate, list[i] );
						list[i] = null;
					}

				}

				// We do not need to do anything for
				// those 2 cases (carry and other[i] are null).
				// ==
				// (5) other[i] = null and list[i] != null and carry = null
				// (7) other[i] = null and list[i] = null and carry = null

			}

			// (0) other[i] != null and list[i] != null and carry != null
			// (2) other[i] != null and list[i] = null and carry != null
			// --> merge carry with other[i]

			else if ( carry !== null ) {

				carry = carry.merge( predicate, other[i] );

			}

			// (1) other[i] != null and list[i] != null and carry = null
			// --> merge current cell with other[i]

			else if ( list[i] !== null ) {

				carry = list[i].merge( predicate, other[i] );
				list[i] = null;

			}


			// (3) other[i] != null and list[i] = null and carry = null
			// --> put other[i] in list

			else {

				list[i] = other[i];

			}

		}

		// do not forget to append last carry

		if ( carry !== null ) {
			list.push( carry );
		}

	};

	var find_min_index = function ( predicate, list, j, len ) {

		var i, opt, item, candidate;

		// there MUST be at least one
		// non null element in this list
		// we look for the first one

		for ( ; j < len - 1 && list[j] === null ; ++j ) ;

		// here j is necessarily < len
		// and list[j] is non null

		i = j;
		opt = list[j].value;

		// we lookup remaining elements to see if there
		// is not a better candidate

		for ( ++j ; j < len ; ++j ) {

			item = list[j];

			if ( item !== null ) {

				candidate = item.value;

				if ( predicate( candidate, opt ) < 0 ) {

					i = j;
					opt = candidate;

				}

			}

		}

		return i;

	};

	var remove_head_at_index = function ( predicate, list, i, len ) {

		var orphans;

		orphans = list[i].children;
		list[i] = null;

		change_parent( null, orphans );

		// we just removed the ith element
		// if list[i] is the last cell
		// of list we can drop it

		if ( i === len - 1 ) {
			list.pop();
		}

		// we merge back the children of
		// the removed tree into the heap

		merge( predicate, list, orphans );

	};

	var binomial_heap_pop = function ( predicate, list ) {

		var i, len, tree;

		len = list.length;

		i = find_min_index( predicate, list, 0, len );

		tree = list[i];

		remove_head_at_index( predicate, list, i, len );

		return tree;
	};

	var change_parent = function ( parent, children ) {

		var i, len;

		for ( i = 0, len = children.length ; i < len ; ++i ) {
			children[i].setparent(parent);
		}

	};

	var shift_up = function ( tree, parent ) {

		var tmp, i;

		// console.log( "tree", tree.value );
		// console.log( "parent", parent.value );

		// Here, we cannot just swap values as it would invalidate
		// externally stored references.
		// Instead, we swap children lists and update references
		// between the tree and its parent.
		// Then we update and return the new tree's parent.

		// console.log( "tree.children", tree.children );
		// console.log( "parent.children", parent.children );

		tmp = parent.children;
		parent.children = tree.children;
		tree.children = tmp;


		i = parent.rank();

		// console.log( tree.children, i );

		tree.children[i] = parent;

		tree.parent = parent.parent;

		change_parent( tree, tree.children );
		change_parent( parent, parent.children );

		// console.log( "tree.children", tree.children );
		// console.log( "parent.children", parent.children );

		return tree.parent;

	};

	var percolate_up = function ( list, tree ) {

		var tmp, parent;

		parent = tree.parent;

		if ( parent !== null ) {

			while ( true ) {

				parent = shift_up( tree, parent );

				if ( parent === null ) {
					break;
				}

				// TODO this call might not be necessary
				parent.children[tree.rank()] = tree;

			}

			list[tree.rank()] = tree;

		}

	};

	var decreasekey = function ( predicate, list, tree, value ) {

		var d, tmp, parent;

		tree.value = value;
		parent = tree.parent;

		if ( parent !== null ) {

			while ( true ) {

				d = predicate( value, parent.value );

				if ( d >= 0 ) {
					return;
				}

				parent = shift_up( tree, parent );

				if ( parent === null ) {
					break;
				}

				// TODO this call should be in if ( d >= 0 )
				parent.children[tree.rank()] = tree;

			}

			list[tree.rank()] = tree;

		}

	};

	var deletetree = function ( predicate, list, tree ) {

		percolate_up( list, tree );

		remove_head_at_index( predicate, list, tree.rank(), list.length );

		tree.detach();

	};

	var BinomialHeap = function ( predicate ) {

		// the predicate to use to compare values

		this.predicate = predicate;


		// number of elements in this heap

		this.length = 0;


		// list of binomial trees

		this.list = [];

	};

	BinomialHeap.prototype.head = function () {

		var i, tree;

		if ( this.length === 0 ) {
			return undefined;
		}

		i = find_min_index( this.predicate, this.list, 0, this.list.length );

		tree = this.list[i];

		return tree.value;

	};

	BinomialHeap.prototype.headreference = function () {

		var i, tree;

		if ( this.length === 0 ) {
			return null;
		}

		i = find_min_index( this.predicate, this.list, 0, this.list.length );

		tree = this.list[i];

		return tree;

	};

	BinomialHeap.prototype.pop = function () {

		if ( this.length === 0 ) {
			return undefined;
		}

		--this.length;

		return binomial_heap_pop( this.predicate, this.list ).value;

	};

	BinomialHeap.prototype.popreference = function () {

		if ( this.length === 0 ) {
			return null;
		}

		--this.length;

		return binomial_heap_pop( this.predicate, this.list ).detach();

	};

	BinomialHeap.prototype.push = function ( value ) {

		var tree;

		// push a new tree of rank 0

		tree = new BinomialTree( value, [] );

		this.pushreference( tree );

		return tree;

	};

	BinomialHeap.prototype.pushreference = function ( tree ) {

		++this.length;

		// push an existing tree of rank 0

		binomial_heap_push( this.predicate, this.list, tree, 0 );

	};

	BinomialHeap.prototype.merge = function ( other ) {

		merge( this.predicate, this.list, other.list );

		this.length += other.length;

		return this;

	};

	BinomialHeap.prototype.update = function ( tree, value ) {

		var d;

		d = this.predicate( value, tree.value );

		if ( d < 0 ) {
			this.decreasekey( tree, value );
		}

		else if ( d > 0 ) {
			this.increasekey( tree, value );
		}

		else {

			// d === 0 does not imply tree.value === value

			tree.value = value;

		}

	};

	BinomialHeap.prototype.decreasekey = function ( tree, value ) {

		decreasekey( this.predicate, this.list, tree, value );

	};

	BinomialHeap.prototype.increasekey = function ( tree, value ) {

		deletetree( this.predicate, this.list, tree );

		tree.value = value;

		binomial_heap_push( this.predicate, this.list, tree, 0 );

	};

	BinomialHeap.prototype.delete = function ( tree ) {

		--this.length;

		deletetree( this.predicate, this.list, tree );

	};

	return BinomialHeap;

};

exports.__BinomialHeap__ = __BinomialHeap__;

/* js/src/adt/BinomialHeap/BinomialTree.js */


var BinomialTree = function ( value, children ) {
	this.value = value;
	this.children = children;
};

/**
 * /!\ Can only be used to merge two trees of the same rank.
 * /!\ Modifies both trees
 */

BinomialTree.prototype.merge = function ( predicate, other ) {

	if ( predicate( this.value, other.value ) <= 0 ) {
		this.children = this.children.concat( other );
		return this;
	}

	else {
		other.children = other.children.concat( this );
		return other;
	}

};

/**
 * Method used to reset a tree element in order to reuse it
 * somewhere else, e.g. insert it back in the same or a new
 * heap.
 */

BinomialTree.prototype.detach = function () {
	this.children.splice( 0 );
	return this;
};

BinomialTree.prototype.setparent = function ( parent ) {
	// we do not keep track of any parent here
};

exports.BinomialTree = BinomialTree;

/* js/src/adt/BinomialHeap/BinomialTreeWithParent.js */


var BinomialTreeWithParent = function ( value, children ) {
	this.value = value;
	this.children = children;
	this.parent = null;
};

BinomialTreeWithParent.prototype.rank = function () {
	return this.children.length;
};

/**
 * /!\ Can only be used to merge two trees of the same rank.
 * /!\ Modifies both trees
 */

BinomialTreeWithParent.prototype.merge = function ( predicate, other ) {

	if ( predicate( this.value, other.value ) <= 0 ) {
		this.children = this.children.concat( other );
		other.parent = this;
		return this;
	}

	else {
		other.children = other.children.concat( this );
		this.parent = other;
		return other;
	}

};

/**
 * Method used to reset a tree element in order to reuse it
 * somewhere else, e.g. insert it back in the same or a new
 * heap.
 */

BinomialTreeWithParent.prototype.detach = function () {
	this.children.splice( 0 );
	this.parent = null;
	return this;
};

BinomialTreeWithParent.prototype.setparent = function ( parent ) {
	this.parent = parent;
};

exports.BinomialTreeWithParent = BinomialTreeWithParent;

/* js/src/adt/BinomialHeap/LazyBinomialHeap.js */

var __LazyBinomialHeap__ = function ( BinomialTree ) {

	var lazy_binomial_heap_push = function( lazy, tree, rank ){

		var i, sequence;

		// lightweight binomial heap containing a unique tree

		sequence = [];


		// offset tree by its rank

		i = rank;

		while ( i-- ) {
			sequence.push( null );
		}

		sequence.push( tree );


		// do not merge the generated sequence immediately

		lazy.push( sequence );

	};

	var merge = function ( predicate, list, other ) {

		var i, len, carry;

		if ( other.length === 0 ) {
			return;
		}

		// merging two binomial heaps is like
		// adding two little endian integers
		// so, we first make sure that we have
		// enough place to store the result

		i = other.length - list.length;

		while ( i --> 0 ) {
			list.push( null );
		}

		carry = null;

		len = list.length;

		// remember len >= other.length

		for ( i = 0 ; i < len ; ++i ) {

			// other[i] can be either null or not
			// list[i] can be either null or not
			// carry can be either null or not
			// --> 2^3 = 8 possibilities
			//
			//    null ? | other[i] | list[i] | carry
			// ---------------------------------------
			//     (0)   |    no    |     no  |   no
			//     (1)   |    no    |     no  |  yes
			//     (2)   |    no    |    yes  |   no
			//     (3)   |    no    |    yes  |  yes
			//     (4)   |   yes    |     no  |   no
			//     (5)   |   yes    |     no  |  yes
			//     (6)   |   yes    |    yes  |   no
			//     (7)   |   yes    |    yes  |  yes

			if ( i >= other.length || other[i] === null ) {

				if ( carry !== null ) {


					// (6) other[i] = null and list[i] = null and carry != null
					// --> put carry in current cell

					if ( list[i] === null ) {
						list[i] = carry;
						carry = null;
					}


					// (4) other[i] = null and list[i] != null and carry != null
					// --> merge carry with current cell

					else {
						carry = carry.merge( predicate, list[i] );
						list[i] = null;
					}

				}

				// We do not need to do anything for
				// those 2 cases (carry and other[i] are null).
				// ==
				// (5) other[i] = null and list[i] != null and carry = null
				// (7) other[i] = null and list[i] = null and carry = null

			}

			// (0) other[i] != null and list[i] != null and carry != null
			// (2) other[i] != null and list[i] = null and carry != null
			// --> merge carry with other[i]

			else if ( carry !== null ) {

				carry = carry.merge( predicate, other[i] );

			}

			// (1) other[i] != null and list[i] != null and carry = null
			// --> merge current cell with other[i]

			else if ( list[i] !== null ) {

				carry = list[i].merge( predicate, other[i] );
				list[i] = null;

			}


			// (3) other[i] != null and list[i] = null and carry = null
			// --> put other[i] in list

			else {

				list[i] = other[i];

			}

		}

		// do not forget to append last carry

		if ( carry !== null ) {
			list.push( carry );
		}

	};


	var lazy_binomial_heap_pop = function ( predicate, list, lazy ) {

		var i, j, len, opt, item, candidate, orphan;

		len = lazy.length;


		// amortized merge of
		// stored values

		for ( i = 0 ; i < len ; ++i ) {
			merge( predicate, list, lazy[i] );
		}


		// clean up lazy list

		lazy.splice( 0 );


		// standard O(log n) optimum search method

		len = list.length;

		// there MUST be at least one
		// non null element in this list
		// we look for the first one

		for ( j = 0 ; j < len - 1 && list[j] === null ; ++j ) ;

		// here j is necessarily < len
		// and list[j] is non null

		i = j;
		opt = list[j].value;

		// we lookup remaining elements to see if there
		// is not a better candidate

		for ( ++j ; j < len ; ++j ) {

			item = list[j];

			if ( item !== null ) {

				candidate = item.value;

				if ( predicate( candidate, opt ) < 0 ) {

					i = j;
					opt = candidate;

				}

			}

		}

		orphan = list[i].children;
		list[i] = null;

		// we just removed the ith element
		// if list[i] is the last cell
		// of list we can drop it

		if ( i === len - 1 ) {
			list.pop();
		}

		// we store the children in the
		// lazy list

		lazy.push( orphan );

		return opt;
	};

	var LazyBinomialHeap = function ( predicate ) {

		// the predicate to use to compare values

		this.predicate = predicate;


		// number of elements in this heap

		this.length = 0;


		// list of binomial trees

		this.list = [];


		// list of binomial heaps waiting to be merged

		this.lazy = [];

	};


	LazyBinomialHeap.prototype.pop = function () {

		if ( this.length === 0 ) {
			return undefined;
		}

		--this.length;

		return lazy_binomial_heap_pop( this.predicate, this.list, this.lazy );

	};

	LazyBinomialHeap.prototype.push = function (value) {

		++this.length;

		// push a new tree of rank 0

		return lazy_binomial_heap_push( this.lazy, new BinomialTree( value, [] ), 0 );

	};


	LazyBinomialHeap.prototype.merge = function ( other ) {
		var i;
		for ( i = 0 ; i < other.lazy.length ; ++i ) {
			this.lazy.push( other.lazy[i] );
		}
		this.lazy.push( other.list );
		this.length += other.length;
		return this;
	};

	return LazyBinomialHeap;
};

exports.__LazyBinomialHeap__ = __LazyBinomialHeap__;

/* js/src/adt/DAryHeap */
/* js/src/adt/DAryHeap/000-namespace.js */

var daryheap = {};

exports.daryheap = daryheap;

/* js/src/adt/DAryHeap/001-core */
/* js/src/adt/DAryHeap/001-core/delete.js */

/**
 * Delete a target element from a d-ary heap
 *
 * Hypothesis : i < j
 *
 * @param {int} arity arity of the heap
 * @param {function} compare the comparison function
 * @param {function} swap the swap function
 * @param {array} a the array where the heap is stored
 * @param {int} i is the root
 * @param {int} j - 1 is the last leaf
 * @param {int} k is the target node
 */

daryheap.delete = function ( arity, compare, swap, a, i, j, k ) {

	// sniff target node all the way up

	daryheap.sniffup( arity, compare, swap, a, i, j, k );

	// pop target node

	return daryheap.pop( arity, compare, swap, a, i, j );

};

/* js/src/adt/DAryHeap/001-core/merge.js */

/**
 * Merge heaps at intervals [i, j[ and [j, k[ in array *a*
 * into a new heap at interval [i, k[.
 *
 * Hypothesis :
 *
 *   - i <= j <= k
 *   - j - 1 is the last leaf ot the first heap
 *
 * @param {int} arity arity of the heap
 * @param {function} compare the comparison function
 * @param {function} swap the swap function
 * @param {array} a the array where the two heaps are stored
 * @param {int} i is the root of the first heap
 * @param {int} j is the root of the second heap
 * @param {int} k - 1 is the index of the last leaf in the second heap
 */

daryheap.merge = function ( arity, compare, swap, a, i, j, k ) {

	for ( ; j < k ; ++j ) {
		daryheap.percolateup( arity, compare, swap, a, i, j + 1, j );
	}

};

/* js/src/adt/DAryHeap/001-core/nextchild.js */


/**
 * Computes which child is the smallest according
 * to a comparison function.
 *
 * Hypothesis : i < j i.e. there should be at least one child
 *
 * @param {int} arity arity of the heap
 * @param {function} compare the comparison function
 * @param {function} swap the swap function
 * @param {array} a the array where the heap is stored
 * @param {int} i is the first child
 * @param {int} j - 1 is the last leaf
 */

daryheap.nextchild = function ( arity, compare, swap, a, i, j ) {

	var k, best;

	k = i + Math.min( arity, j - i );

	best = i;

	for ( ++i ; i < k ; ++i ) {

		if ( compare( a[i], a[best] ) < 0 ) {
			best = i;
		}

	}

	return best;

};

/* js/src/adt/DAryHeap/001-core/percolatedown.js */


/**
 * Percolates down a node.
 *
 * @param {int} arity arity of the heap
 * @param {function} compare the comparison function
 * @param {function} swap the swap function
 * @param {array} a the array where the heap is stored
 * @param {int} i is the root element
 * @param {int} j - 1 is the last leaf
 * @param {int} k is the target node
 */

daryheap.percolatedown = function ( arity, compare, swap, a, i, j, k ) {

	var current, candidate, firstchild;

	current = k - i;

	while ( true ) {

		// address of the first child in a zero-based
		// d-ary heap

		firstchild = arity * current + 1;

		// if current node has no children
		// then we are done

		if ( firstchild >= j - i ) {
			break;
		}

		// if current value is smaller than its smallest
		// child then we are done

		candidate = daryheap.nextchild( arity, compare, swap, a, i + firstchild, j );

		if ( compare( a[i + current], a[candidate] ) <= 0 ) {
			break;
		}

		// otherwise
		// swap with smallest child

		swap( a, i + current, candidate );

		current = candidate - i;

	}

	return i + current;

};

/* js/src/adt/DAryHeap/001-core/percolateup.js */

/**
 * Percolates up a node.
 *
 * @param {int} arity arity of the heap
 * @param {function} compare the comparison function
 * @param {function} swap the swap function
 * @param {array} a the array where the heap is stored
 * @param {int} i is the root element
 * @param {int} j - 1 is the last leaf
 * @param {int} k is the target node
 */

daryheap.percolateup = function ( arity, compare, swap, a, i, j, k ) {

	var current, parent;

	current = k - i;

	// while we are not the root

	while ( current !== 0 ) {

		// address of the parent in a zero-based
		// d-ary heap

		parent = i + Math.floor( ( current - 1 ) / arity );

		// if current value is greater than its parent
		// then we are done

		if ( compare( a[i + current], a[parent] ) >= 0 ) {
			return i + current;
		}

		// otherwise
		// swap with parent

		swap( a, i + current, parent );

		current = parent - i;

	}

	return i + current;

};

/* js/src/adt/DAryHeap/001-core/pop.js */

/**
 * Pop the root from a d-ary heap
 *
 * Hypothesis : i < j
 *
 * @param {int} arity arity of the heap
 * @param {function} compare the comparison function
 * @param {function} swap the swap function
 * @param {array} a the array where the heap is stored
 * @param {int} i is the root
 * @param {int} j - 1 is the last leaf
 */

daryheap.pop = function ( arity, compare, swap, a, i, j ) {

	var popped;


	// decrement size of heap

	--j;


	// put last leaf at root

	popped = a[i];
	a[i] = a[j];


	// percolate down the new root

	daryheap.percolatedown( arity, compare, swap, a, i, j, i );


	// return old root

	return popped;

};

/* js/src/adt/DAryHeap/001-core/push.js */

/**
 * Insert the jth element of an array in an existing
 * dary heap in interval [i, j[
 *
 * Hypothesis : i <= j
 *
 * @param {int} arity arity of the heap
 * @param {function} compare the comparison function
 * @param {function} swap the swap function
 * @param {array} a the array where the heap is stored
 * @param {int} i is the root
 * @param {int} j - 1 is the new leaf
 */

daryheap.push = function ( arity, compare, swap, a, i, j ) {

	// percolate up the new leaf

	return daryheap.percolateup( arity, compare, swap, a, i, j + 1, j );

};

/* js/src/adt/DAryHeap/001-core/sniffup.js */

/**
 * Percolates up a node.
 *
 * @param {int} arity arity of the heap
 * @param {function} compare the comparison function
 * @param {function} swap the swap function
 * @param {array} a the array where the heap is stored
 * @param {int} i is the root element
 * @param {int} j - 1 is the last leaf
 * @param {int} k is the target node
 */

daryheap.sniffup = function ( arity, compare, swap, a, i, j, k ) {

	var current, parent;

	current = k - i;

	// while we are not the root

	while ( current !== 0 ) {

		// address of the parent in a zero-based
		// d-ary heap

		parent = i + Math.floor( ( current - 1 ) / arity );

		// swap with parent

		swap( a, i + current, parent );

		current = parent - i;

	}

};

/* js/src/adt/DAryHeap/002-adt */
/* js/src/adt/DAryHeap/002-adt/DAryHeap.js */


var DAryHeap = function ( arity, compare ) {

	// arity of this heap

	this.arity = arity;


	// the comparison function

	this.compare = function ( a, b ) {
		return compare( a.value, b.value );
	};


	// the original comparison function

	this._compare = compare;


	// array used to store values

	this.array = [];


	// size of the heap

	this.length = 0;

};


DAryHeap.Reference = function ( index, value ) {

	this.index = index;
	this.value = value;

};


DAryHeap.prototype.swap = function ( a, i, j ) {

	var tmp;

	tmp = a[i];
	a[i] = a[j];
	a[j] = tmp;

	a[i].index = i;
	a[j].index = j;

};


DAryHeap.prototype.head = function () {

	if ( this.length === 0 ) {
		return undefined;
	}

	return this.array[0].value;

};


DAryHeap.prototype.headreference = function () {

	if ( this.length === 0 ) {
		return null;
	}

	return this.array[0];

};


DAryHeap.prototype.pop = function () {

	var a, i, j, reference;

	if ( this.length === 0 ) {
		return undefined;
	}

	a = this.array;
	i = 0;
	j = a.length;

	reference = daryheap.pop( this.arity, this.compare, this.swap, a, i, j );

	a.pop();

	--this.length;

	return reference.value;

};


DAryHeap.prototype.popreference = function () {

	var a, i, j, reference;

	if ( this.length === 0 ) {
		return null;
	}

	a = this.array;
	i = 0;
	j = a.length;

	reference = daryheap.pop( this.arity, this.compare, this.swap, a, i, j );

	a.pop();

	--this.length;

	return reference;

};


DAryHeap.prototype.push = function ( value ) {

	var a, i, j, reference;

	a = this.array;
	i = 0;
	j = a.length;

	reference = new DAryHeap.Reference( j, value );

	a.push( reference );

	daryheap.push( this.arity, this.compare, this.swap, a, i, j );

	++this.length;

	return reference;

};


DAryHeap.prototype.pushreference = function ( reference ) {

	var a, i, j;

	a = this.array;
	i = 0;
	j = a.length;


	reference.index = j;
	a.push( reference );

	daryheap.push( this.arity, this.compare, this.swap, a, i, j );

	++this.length;

};


DAryHeap.prototype.merge = function ( other ) {

	var a, i, j, k, t;

	a = this.array;
	i = 0;
	j = a.length;

	// concat arrays of both heaps

	a = this.array = a.concat( other.array );

	k = a.length;

	// update index of concatenated elements

	for ( t = j ; t < k ; ++t ) {
		a[t].index = t;
	}

	daryheap.merge( this.arity, this.compare, this.swap, a, i, j, k );

	this.length += other.length;

};


DAryHeap.prototype.update = function ( reference, value ) {

	var d;

	d = this._compare( value, reference.value );

	if ( d < 0 ) {
		this.decreasekey( reference, value );
	}

	else if ( d > 0 ) {
		this.increasekey( reference, value );
	}

	else {

		// d === 0 does not imply reference.value === value

		reference.value = value;

	}

};

DAryHeap.prototype.decreasekey = function ( reference, value ) {

	var a, i, j, k;

	a = this.array;
	i = 0;
	j = a.length;
	k = reference.index;

	reference.value = value;

	daryheap.percolateup( this.arity, this.compare, this.swap, a, i, j, k );

};

DAryHeap.prototype.increasekey = function ( reference, value ) {

	var a, i, j, k;

	a = this.array;
	i = 0;
	j = a.length;
	k = reference.index;

	reference.value = value;

	daryheap.percolatedown( this.arity, this.compare, this.swap, a, i, j, k );

};

DAryHeap.prototype.delete = function ( reference ) {

	var a, i, j, k;

	a = this.array;
	i = 0;
	j = a.length;
	k = reference.index;

	daryheap.delete( this.arity, this.compare, this.swap, a, i, j, k );

	a.pop();

	--this.length;

};

exports.DAryHeap = DAryHeap;

/* js/src/adt/DAryHeap/002-adt/DAryHeapWithoutReferences.js */


var DAryHeapWithoutReferences = function ( arity, compare ) {

	// arity of this heap

	this.arity = arity;


	// the comparison function

	this.compare = compare;


	// array used to store values

	this.array = [];


	// size of the heap

	this.length = 0;

};


DAryHeapWithoutReferences.prototype.swap = function ( a, i, j ) {

	var tmp;

	tmp = a[i];
	a[i] = a[j];
	a[j] = tmp;

};


DAryHeapWithoutReferences.prototype.head = function () {

	if ( this.length === 0 ) {
		return undefined;
	}

	return this.array[0];

};


DAryHeapWithoutReferences.prototype.pop = function () {

	var a, i, j, value;

	if ( this.length === 0 ) {
		return undefined;
	}

	a = this.array;
	i = 0;
	j = a.length;

	value = daryheap.pop( this.arity, this.compare, this.swap, a, i, j );

	a.pop();

	--this.length;

	return value;

};


DAryHeapWithoutReferences.prototype.push = function ( value ) {

	var a, i, j;

	a = this.array;
	i = 0;
	j = a.length;


	a.push( value );

	daryheap.push( this.arity, this.compare, this.swap, a, i, j );

	++this.length;

};

DAryHeapWithoutReferences.prototype.merge = function ( other ) {

	var a, i, j, k;

	a = this.array;
	i = 0;
	j = a.length;

	a = this.array = a.concat( other.array );

	k = a.length;

	daryheap.merge( this.arity, this.compare, this.swap, a, i, j, k );

	this.length += other.length;

};

exports.DAryHeapWithoutReferences = DAryHeapWithoutReferences;


/* js/src/adt/DoublyLinkedList.js */
(function(){

/**
 * Doubly linked list implementation
 * making use of dummy nodes for the
 * sake of simplicity.
 */

var DoublyLinkedList = function(){
	this.front = new Node(null, null, null);
	this.back = new Node(this.front, null, null);
	this.front.next = this.back;
	this.length = 0;
};

var Node = function(prev, next, value){
	this.prev = prev;
	this.next = next;
	this.value = value;
};

var Iterator = function(front, back, current){
	this.front = front;
	this.back = back;
	this.current = current;
};

var ReverseIterator = function(front, back, current){
	this.front = front;
	this.back = back;
	this.current = current;
};

DoublyLinkedList.prototype.insertAfter = function(iterator, value){
	var node, prev;

	prev = iterator.current;

	node = new Node(prev, prev.next, value);
	prev.next.prev = node;
	prev.next = node;

	++this.length;
	return this.iterator(node);
};

DoublyLinkedList.prototype.insertBefore = function(iterator, value){
	var node, next;

	next = iterator.current;

	node = new Node(next.prev, next, value);
	next.prev.next = node;
	next.prev = node;

	++this.length;
	return this.iterator(node);
};

DoublyLinkedList.prototype.unshift = function(value){
	return this.insertAfter(this.begin(), value);
};

DoublyLinkedList.prototype.push = function(value){
	return this.insertBefore(this.end(), value);
};

DoublyLinkedList.prototype.erase = function(iterator){
	var node = iterator.current;

	node.prev.next = node.next;
	node.next.prev = node.prev;

	--this.length;
	return this.iterator(node.next);
};

DoublyLinkedList.prototype.rerase = function(iterator){
	var node = iterator.current;

	node.next.prev = node.prev;
	node.prev.next = node.next;

	--this.length;
	return this.iterator(node.prev);
};

DoublyLinkedList.prototype.eraserange = function(first, last){
	var firstnode, lastnode, it;
	firstnode = first.current;
	lastnode = last.current;

	lastnode.prev = firstnode.prev;
	firstnode.prev.next = lastnode;

	it = first.copy();

	while (it.current !== lastnode) {
		--this.length;
		it.next();
	}
	return last.copy();
};

DoublyLinkedList.prototype.reraserange = function(first, last){
	var firstnode, lastnode, it;
	firstnode = first.current;
	lastnode = last.current;

	lastnode.next = firstnode.next;
	firstnode.next.prev = lastnode;

	it = first.copy();

	while (it.current !== lastnode) {
		--this.length;
		it.next();
	}
	return last.copy();
};

DoublyLinkedList.prototype.shift = function(){
	var it = this.begin();
	var e = it.next();

	if (e.done) {
		return null;
	}

	this.rerase(it);
	return e.value;
};

DoublyLinkedList.prototype.pop = function(){
	var it = this.rbegin();
	var e = it.next();

	if (e.done) {
		return null;
	}

	this.erase(it);
	return e.value;
};

DoublyLinkedList.prototype.clear = function(){
	this.front.next = this.back;
	this.back.prev = this.front;
	this.length = 0;
	return this;
};

DoublyLinkedList.prototype.iterator = function(node){
	return new Iterator(this.front, this.back, node);
};

DoublyLinkedList.prototype.riterator = function(node){
	return new ReverseIterator(this.front, this.back, node);
};

DoublyLinkedList.prototype.begin = function(){
	return this.iterator(this.front);
};

DoublyLinkedList.prototype.end = function(){
	return this.iterator(this.back);
};

DoublyLinkedList.prototype.rbegin = function(){
	return this.riterator(this.back);
};

DoublyLinkedList.prototype.rend = function(){
	return this.riterator(this.front);
};

Iterator.prototype.copy = function() {
	return new Iterator(this.front, this.back, this.current);
};

ReverseIterator.prototype.copy = function() {
	return new ReverseIterator(this.front, this.back, this.current);
};

Iterator.prototype.next =
ReverseIterator.prototype.prev =
function(){
	this.current = this.current.next;
	if (this.current === this.back) {
		return { done : true };
	}
	else {
		return {
			value : this.current.value,
			done : false
		};
	}
};

Iterator.prototype.prev =
ReverseIterator.prototype.next =
function(){
	this.current = this.current.prev;
	if (this.current === this.front) {
		return { done : true };
	}
	else {
		return {
			value : this.current.value,
			done : false
		};
	}
};

DoublyLinkedList.Node = Node;
DoublyLinkedList.Iterator = Iterator;
DoublyLinkedList.ReverseIterator = ReverseIterator;


exports.DoublyLinkedList = DoublyLinkedList;

})();

/* js/src/array */
/* js/src/array/iter.js */



var fiter = function ( i, j, fn ) {
	for ( ; i < j ; ++i ) {
		fn( i );
	}
};

var biter = function ( i, j, fn ) {
	while ( --j >= i ) {
		fn( j );
	}
};



exports.fiter = fiter;
exports.biter = biter;

/* js/src/bdp */
/* js/src/bdp/bdpdc.js */

/**
 * Bichromatic dominating pairs using the divide and conquer chainsaw.
 *
 * see F. P. Preparata and M. I. Shamos, Computational Geometry, NY, 1985, p. 366.
 *
 * Here the algorithm handles non-strict ( >= ) dominance.
 *
 * select( f, a, i, j, k ) where
 *   f is a comparator
 *   a the array of points
 *   [i, j[ the range to search in the array
 *   k the index to select
 *
 * select(...) partitions the array in tree regions
 *  -----------------------------
 * |    <= h    | h |    >= h    |
 *  -----------------------------
 * i    ....    k  k+1   ....   j-1
 *
 * __eq__( d, v ) template for a function eq( a )
 *   returns true iff coordinate d of a equals v
 *
 * __ne__( d, v ) template for a function ne( y )
 *   returns true iff coordinate d of a is not equal to v
 *
 * color( point )
 *   = 0 if point is blue
 *   = 1 if point is red
 *
 * p = split( predicate, a, i, j )
 *   rearranges an array so that all elements for which predicate is false
 *   are in interval [i, p[ and all other elements are in interval [p, j[
 *
 * swap( a, ai, aj, b, bi )
 *   swap elements from a in interval [ai, aj[ with elements from b in interval
 *   [bi, bi + aj - ai[
 *
 */


var __bdpdc__ = function ( select, __eq__, __ne__, color, split, swap ) {

	/**
	 * a is an array of points
	 *
	 *     note that we only consider points starting
	 *     at index i and ending at index j-1 in a
	 *
	 * points are arrays of coordinates
	 *
	 *     d = dj - di is the number of coordinates of each point
	 *
	 *
	 * __f__ is a template for a function {coordinates^2} -> {<0, =0, >0} named f
	 *
	 *     i.e. for coordinates a and b
	 *
	 *       f( a, b ) < 0 means a < b;
	 *       f( a, b ) = 0 means a = b;
	 *       f( a, b ) > 0 means a > b.
	 *
	 * out is the output array
	 *
	 */

	var bdpdc = function ( __f__, a, i, j, di, dj, out ) {

		var k, h, x, y, p, q, m, n, _m, _n;

		// empty or one element array case

		if ( i >= j - 1 ) {
			return out;
		}

		// base case : dj - di = d = 0
		// enumerate all red / blue pairs
		// [i, p[ contains only blue points
		// [p, j[ contains only red points
		// p = index of first red point

		if ( di === dj ) {

			// move all blue points left and all red points right
			// (arbitrary choice)

			p = split( color, a, i, j );

			// for each red point

			for ( x = p ; x < j ; ++x ) {

				// for each blue point

				for ( y = i ; y < p ; ++y ) {

					out.push( [ a[x], a[y] ] );

				}
			}

			return out;

		}

		/**
		 * recursion fairy
		 *
		 * we compute m such that h is the median of
		 * the ith coordinate of all points
		 *
		 */

		else {


			//  -------------------------------------------------------
			// |                     b&r scrambled                     |
			//  -------------------------------------------------------
			// i                                                       j

			k = ( i + j ) / 2 | 0;

			//  -------------------------------------------------------
			// |                     b&r scrambled                     |
			//  -------------------------------------------------------
			// i                         k                             j

			// select median element
			// O(n)

			select( __f__( di ), a, i, j, k );

			h = a[k][di];

			//  -------------------------------------------------------
			// |         b&r <= h        | h |         b&r >= h        |
			//  -------------------------------------------------------
			// i                         k                             j


			// we do 3 recursive calls
			//
			// first: for red and blue points with di < h in R^d
			// we do not consider points with di = h because either
			//
			// 1. red = h, blue < h --> handled by last call
			// 2. red < h, blue = h --> red cannot dominate blue
			// 3. red = h, blue = h --> handled by last call
			//    (would be "red cannot dominate blue" for strict dominance
			//    in this 3rd case)
			//
			// second: for red and blue points with di > h in R^d
			// we do not consider points with di = h for similar reasons as above
			//
			// last: for red points with di >= h and blue points with di <= h in R^{d-1}
			// (would be > and < for strict dominance)
			//
			// note that we do not need to handle the case where red < h and blue >= h
			// or red <= h and blue > h since red cannot dominate blue in those cases

			// first recursive call
			// we only consider points that have di < h
			// since all points that have di = h will be handled later

			// move median elements from [ i, k [ in the [ x, k [ interval, x >= i
			// O(n)

			x = split( __eq__( di, h ), a, i, k );

			//  -------------------------------------------------------
			// |    b&r < h    | b&r = h | h |         b&r > h         |
			//  -------------------------------------------------------
			// i               x         k                             j

			bdpdc( __f__, a, i, x, di, dj, out );

			// move median elements from [ k + 1, j [ in the [ y, j [ interval, y <= j
			// O(n)

			y = split( __ne__( di, h ), a, k + 1, j );

			//  -------------------------------------------------------
			// |    b&r < h    | b&r = h | h | b&r = h |    b&r > h    |
			//  -------------------------------------------------------
			// i               x         k             y               j

			bdpdc( __f__, a, y, j, di, dj, out );

			// since we do not touch median elements in the first two
			// recursive calls they are still at the correct place

			// Now we want to
			//   - move red points such that di < h to the right
			//   - move red points such that di >= h to the left
			//
			// /!\ Note that we also might think that we should
			//   - move blue points such that di > h to the right
			//   - move blue points such that di <= h to the left
			// but after the selection algorithm this is already the case


			//  -------------------------------------------------------
			// |    b&r < h    | b&r = h | h | b&r = h |    b&r > h    |
			//  -------------------------------------------------------
			// i               x         k             y               j

			p = split( color, a, i, x );

			//  -------------------------------------------------------
			// | b < h | r < h | b&r = h | h | b&r = h |    b&r > h    |
			//  -------------------------------------------------------
			// i       p       x         k             y               j

			q = split( color, a, y, j );

			//  -------------------------------------------------------
			// | b < h | r < h | b&r = h | h | b&r = h | b > h | r > h |
			//  -------------------------------------------------------
			// i       p       x         k             y       q       j

			// we now want to swap r < h elements with r > h elements
			// we have 3 cases
			//   1. x - p = j - q
			//   2. x - p < j - q
			//   3. x - p > j - q

			m = x - p;
			n = j - q;


			//   1. x - p = j - q

			if ( m === n ) {
				swap( a, q, j, a, p );

				//  -------------------------------------------------------
				// | b < h | r > h | b&r = h | h | b&r = h | b > h | r < h |
				//  -------------------------------------------------------
				// i       p       x         k             y       q       j

				j = y;

				//  -------------------------------------------------------
				// | b < h | r > h | b&r = h | h | b&r = h | b > h | r < h |
				//  -------------------------------------------------------
				// i       p       x         k             j      ...

			}


			//   2. x - p < j - q

			else if ( m < n ) {

				swap( a, p, x, a, q );

				//  ---------------------------------------------------------------
				// | b < h | r > h | b&r = h | h | b&r = h | b > h | r < h | r > h |
				//  ---------------------------------------------------------------
				// i       p       x         k             y       q      q+m      j

				// we now want to swap b > h and r < h elements with r > h elements
				//                     [y,q[    [q,q+m[             [q+m,j[
				// we have 2 cases
				//   1. (q + m) - y >= j - (q + m) [OR  >]
				//   2. (q + m) - y  < j - (q + m) [OR <=]

				_m = (q + m) - y;
				_n = j - (q + m);

				//   1. (q + m) - y >= j - (q + m)
				if ( _m >= _n ) {
					swap( a, q + m, j, a, y );
				}
				//   2. (q + m) - y  < j - (q + m)
				else {
					swap( a, j - _m, j, a, y );
				}

				//  ---------------------------------------------------------------
				// | b < h | r > h | b&r = h | h | b&r = h | r > h |   b>h & r<h   |
				//  ---------------------------------------------------------------
				// i       p       x         k             y      y+_n             j

				j = y + _n;

				//  ---------------------------------------------------------------
				// | b < h | r > h | b&r = h | h | b&r = h | r > h |   b>h & r<h   |
				//  ---------------------------------------------------------------
				// i       p       x         k             y       j      ...

			}


			//   3. x - p > j - q

			else {

				swap( a, q, j, a, p );

				//  ---------------------------------------------------------------
				// | b < h | r > h | r < h | b&r = h | h | b&r = h | b > h | r < h |
				//  ---------------------------------------------------------------
				// i       p      p+n      x         k             y       q       j

				// we now want to swap r < h with b&r = h elements
				// we have 2 cases
				//   1. x - (p + n) >= y - x
				//   2. x - (p + n)  < y - x

				_m = x - (p + n);
				_n = y - x;

				//   1. x - (p + n) >= y - x
				if ( _m >= _n ) {
					swap( a, x, y, a, p + n );
				}
				//   2. x - (p + n)  < y - x
				else {
					swap( a, y - _m, y, a, p + n );
				}

				//  -----------------------------------------------------------
				// | b < h | r > h |     b&r = h     | h | b&r = h | b>h & r<h |
				//  -----------------------------------------------------------
				// i       p      p+n                k            y-_m         j

				j = y - _m;

				//  -----------------------------------------------------------
				// | b < h | r > h |     b&r = h     | h | b&r = h | b>h & r<h |
				//  -----------------------------------------------------------
				// i       p      p+n                k             j    ...

			}

			// [i, j[ now contains only b <= h and r >= h points
			// in this new interval, all r points dominate b points
			// for the ith coordinate
			// we can thus ask the recursion fairy to take care of the other
			// dj - di - 1 dimensions left

			bdpdc( __f__, a, i, j, di + 1, dj, out );

			return out;
		}

	};

	return bdpdc;

};

exports.__bdpdc__ = __bdpdc__;

/* js/src/bdp/bdpdn2.js */

/**
 * Bichromatic dominating pairs using a naïve O(d * n^2) algorithm.
 *
 * Here the algorithm handles non-strict ( >= ) dominance.
 *
 * color( point )
 *   = 0 if point is blue
 *   = 1 if point is red
 *
 * p = split( predicate, a, i, j )
 *   rearranges an array so that all elements for which predicate is false
 *   are in interval [i, p[ and all other elements are in interval [p, j[
 *
 */


var __bdpdn2__ = function ( color, split ) {

	/**
	 * a is an array of points
	 *
	 *     note that we only consider points starting
	 *     at index i and ending at index j-1 in a
	 *
	 * points are arrays of coordinates
	 *
	 *     d = dj - di is the number of coordinates of each point
	 *
	 *
	 * __f__ is a template for a function {coordinates^2} -> {<0, =0, >0} named f
	 *
	 *     i.e. for coordinates a and b
	 *
	 *       f( a, b ) < 0 means a < b;
	 *       f( a, b ) = 0 means a = b;
	 *       f( a, b ) > 0 means a > b.
	 *
	 * out is the output array
	 *
	 */

	var bdpdn2 = function ( __f__, a, i, j, di, dj, out ) {

		var x, y, p, d, f;

		// empty or one element array case

		if ( i >= j - 1 ) {
			return out;
		}

		// move all blue points left and all red points right
		// (arbitrary choice)

		// [i, p[ contains only blue points
		// [p, j[ contains only red points
		// p = index of first red point

		p = split( color, a, i, j );

		// for each red point

		red : for ( x = p ; x < j ; ++x ) {

			// for each blue point

			blue : for ( y = i ; y < p ; ++y ) {

				for ( d = di ; d < dj ; ++d ) {

					f = __f__( d );

					if ( f( a[x], a[y] ) < 0 ) {
						continue blue;
					}

				}

				out.push( [ a[x], a[y] ] );

			}
		}

		return out;

	};

	return bdpdn2;

};

exports.__bdpdn2__ = __bdpdn2__;

/* js/src/birthdays */
/* js/src/birthdays/samebirthday.js */


/**
 *
 * Computes the probability ( [0, 1] ) for at least 1 of k people
 * out of n to have his birthday the same day as someone else.
 *
 * hypothesis : k <= n and k <= days
 */

var samebirthday = function ( k, n, days ) {

	var i, p;

	p = 1;

	for ( i = 1 ; i < k ; ++i ) {

		p = p * ( days - i ) / days;

	}

	for ( ; i < n ; ++i ) {

		p = p * ( days - k ) / days;

	}


	return 1 - p;

};

exports.samebirthday = samebirthday;

/* js/src/epsilon */
/* js/src/epsilon/absepsilon.js */


var __absepsilon__ = function ( epsilon ) {


	return function ( a, b ) {

		var r;

		r = a - b;

		return r < -epsilon ? -1 : r > epsilon ? 1 : 0;

	};

};

exports.__absepsilon__ = __absepsilon__;

/* js/src/epsilon/relepsilon.js */

var __relepsilon__ = function ( epsilon ) {


	return function ( a, b ) {

		var r;

		if ( b === 0 ) {
			return a;
		}

		else if ( a === 0 ) {
			return -b;
		}

		else {

			r = a / b - 1;

			return r < -epsilon ? -1 : r > epsilon ? 1 : 0;

		}

	};

};

exports.__relepsilon__ = __relepsilon__;

/* js/src/kldt */
/* js/src/kldt/evenkldtto2sum.js */


/**
 * Transforms an instance of the one-set version of kLDT with k >= 4 even into
 * a two-set version of 2SUM.
 *
 * @param {set} S is the input set for the kLDT problem
 * @param {coefficients} a is the array of coefficients
 * @param {set} A is one of the input set for 2SUM
 * @param {set} B is one of the input set for 2SUM
 *
 * notes:
 *   - n = Sj - Si
 *   - k = aj - ai - 1
 *   - a_0 = a[ai]
 *   - A and B must be of size n^(k/2) each
 *   - B must be initialized to 0 ... 0
 *
 */

var evenkldtto2sum = function ( S , Si , Sj , a , ai , aj , A , Ai , Aj , B , Bi , Bj ) {

	var i , j , p , q , n , halfk ;

	n = Sj - Si ;

	k = aj - ai - 1 ;

	halfk = 1 + k / 2 ;

	// We fill A and B for example with S = [ 1 , 2 , 3 ] and a = [ t , v , w , x , y ]

	//       -----------------------------------------------------------------------
	// A <- |   t   |   t   |   t   |   t   |   t   |   t   |   t   |   t   |   t   |
	//       -----------------------------------------------------------------------

	for ( p = Ai ; p < Aj ; ++p ) {

		A[p] = a[ai] ;

	}

	//       -----------------------------------------------------------------------
	// A += | v * 1 | v * 2 | v * 3 | v * 1 | v * 2 | v * 3 | v * 1 | v * 2 | v * 3 |
	//       -----------------------------------------------------------------------
	//       -----------------------------------------------------------------------
	// A += | w * 1 | w * 1 | w * 1 | w * 2 | w * 2 | w * 2 | w * 3 | w * 3 | w * 3 |
	//       -----------------------------------------------------------------------

	for ( j = 1 , i = 1 ; j < halfk ; ++j , i *= n ) {

		for ( p = Ai , q = 0 ; p < Aj ; ++p , q = ( ( q + 1 ) / i | 0 ) % n ) {

			A[p] += a[ai + j] * S[Si + q] ;

		}

	}

	//       -----------------------------------------------------------------------
	// B += | x * 1 | x * 2 | x * 3 | x * 1 | x * 2 | x * 3 | x * 1 | x * 2 | x * 3 |
	//       -----------------------------------------------------------------------
	//       -----------------------------------------------------------------------
	// B += | y * 1 | y * 1 | y * 1 | y * 2 | y * 2 | y * 2 | y * 3 | y * 3 | y * 3 |
	//       -----------------------------------------------------------------------

	for ( i = 1 ; j <= k ; ++j , i *= n ) {

		for ( p = Bi , q = 0 ; p < Bj ; ++p , q = ( ( q + 1 ) / i | 0 ) % n ) {

			B[p] += a[ai + j] * S[Si + q] ;

		}

	}

} ;

exports.evenkldtto2sum = evenkldtto2sum;

/* js/src/kldt/oddkldtto3sum.js */


/**
 * Transforms an instance of the one-set version of kLDT with k >= 3 odd into
 * a three-set version of 3SUM.
 *
 * @param {set} S is the input set for the kLDT problem
 * @param {coefficients} a is the array of coefficients
 * @param {set} A is one of the input set for 3SUM
 * @param {set} B is one of the input set for 3SUM
 * @param {set} C is one of the input set for 3SUM
 *
 * notes:
 *   - n = Sj - Si
 *   - k = aj - ai - 1
 *   - a_0 = a[ai]
 *   - A and B must be of size n^((k-1)/2) each
 *   - A and B must be initialized to 0 ... 0
 *   - C must be of size n
 *
 */

var oddkldtto3sum = function ( S , Si , Sj , a , ai , aj , A , Ai , Aj , B , Bi , Bj , C , Ci , Cj ) {

	var i , j , p , q , n , halfk ;

	n = Sj - Si ;

	k = aj - ai - 1 ;

	halfk = 2 + ( k - 1 ) / 2 ;

	// We fill A and B for example with S = [ 1 , 2 , 3 ] and a = [ t , u , v , w , x , y ]

	//       -----------------------------------------------------------------------
	// A += | v * 1 | v * 2 | v * 3 | v * 1 | v * 2 | v * 3 | v * 1 | v * 2 | v * 3 |
	//       -----------------------------------------------------------------------
	//       -----------------------------------------------------------------------
	// A += | w * 1 | w * 1 | w * 1 | w * 2 | w * 2 | w * 2 | w * 3 | w * 3 | w * 3 |
	//       -----------------------------------------------------------------------

	for ( j = 2 , i = 1 ; j < halfk ; ++j , i *= n ) {

		for ( p = Ai , q = 0 ; p < Aj ; ++p , q = ( ( q + 1 ) / i | 0 ) % n ) {

			A[p] += a[ai + j] * S[Si + q] ;

		}

	}

	//       -----------------------------------------------------------------------
	// B += | x * 1 | x * 2 | x * 3 | x * 1 | x * 2 | x * 3 | x * 1 | x * 2 | x * 3 |
	//       -----------------------------------------------------------------------
	//       -----------------------------------------------------------------------
	// B += | y * 1 | y * 1 | y * 1 | y * 2 | y * 2 | y * 2 | y * 3 | y * 3 | y * 3 |
	//       -----------------------------------------------------------------------

	for ( i = 1 ; j <= k ; ++j , i *= n ) {

		for ( p = Bi , q = 0 ; p < Bj ; ++p , q = ( ( q + 1 ) / i | 0 ) % n ) {

			B[p] += a[ai + j] * S[Si + q] ;

		}

	}

	// We fill C

	//       -----------------------------------
	// C <- | u * 1 + t | u * 2 + t | u * 3 + t |
	//       -----------------------------------

	for ( q = 0 ; q < n ; ++q ) {

		C[Ci + q] = a[ai + 1] * S[Si + q] + a[ai] ;

	}

} ;

exports.oddkldtto3sum = oddkldtto3sum;

})(typeof exports === 'undefined' ? this['algo'] = {} : exports);
