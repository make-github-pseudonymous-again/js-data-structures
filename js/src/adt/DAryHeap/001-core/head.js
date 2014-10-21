
/**
 * Returns the smallest node of a d-ary heap, i.e. the root.
 *
 * Hypothesis : i < j
 *
 * @param {int} arity arity of the heap
 * @param {function} compare the comparison function
 * @param {array} a the array where the heap is stored
 * @param {int} i is the root
 * @param {int} j - 1 is the last leaf
 */

daryheap.head = function ( arity, compare, a, i, j ) {

	return a[i];

};
