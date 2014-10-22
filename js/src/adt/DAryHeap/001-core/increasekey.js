
/**
 * Increases the value of a target node and
 * updates its position.
 *
 * Hypothesis : i <= j
 *
 * @param {int} arity arity of the heap
 * @param {function} compare the comparison function
 * @param {function} swap the swap function
 * @param {array} a the array where the heap is stored
 * @param {int} i is the root element
 * @param {int} j - 1 is the last leaf
 * @param {int} k is the target node
 * @param {value} value is the target node's new value
 */

daryheap.increasekey = function ( arity, compare, swap, a, i, j, k, value ) {

	// update value of the target element

	a[k] = value;

	// percolate down the target element

	return daryheap.percolatedown( arity, compare, swap, a, i, j, k );

};
