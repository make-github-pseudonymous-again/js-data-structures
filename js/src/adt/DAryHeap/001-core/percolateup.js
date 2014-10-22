
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
			return;
		}

		// otherwise
		// swap with parent

		swap( a, i + current, parent );

		current = parent - i;

	}

	return i + current;

};
