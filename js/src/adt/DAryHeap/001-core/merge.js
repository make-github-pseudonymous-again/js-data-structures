
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
