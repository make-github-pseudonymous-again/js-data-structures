
/**
 * Delete a target element from a d-ary heap
 *
 * Hypothesis : i < j
 *
 * @param {int} arity arity of the heap
 * @param {function} compare the comparison function
 * @param {array} a the array where the heap is stored
 * @param {int} i is the root
 * @param {int} j - 1 is the last leaf
 * @param {int} k is the target node
 */

daryheap.delete = function ( arity, compare, a, i, j, k ) {

	// sniff target node all the way up

	daryheap.sniffup( arity, compare, a, i, j, k );

	// pop target node

	return daryheap.pop( arity, compare, a, i, j );

};
