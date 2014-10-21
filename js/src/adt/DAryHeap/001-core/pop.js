
/**
 * Pop the root from a d-ary heap
 *
 * Hypothesis : i < j
 *
 * @param {int} arity arity of the heap
 * @param {function} compare the comparison function
 * @param {array} a the array where the heap is stored
 * @param {int} i is the root
 * @param {int} j - 1 is the last leaf
 */

daryheap.pop = function ( arity, compare, a, i, j ) {

	var popped;


	// decrement size of heap

	--j;


	// put last leaf at root

	popped = a[i];
	a[i] = a[j];


	// percolate down the new root

	daryheap.percolatedown( arity, compare, a, i, j, i );


	// return old root

	return popped;

};
