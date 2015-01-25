(function(exports, undefined){

	'use strict';


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

})(typeof exports === 'undefined' ? this['datastructures'] = {} : exports);
