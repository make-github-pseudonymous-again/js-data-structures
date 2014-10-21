
/**
 * Percolates up a node.
 *
 * @param {int} arity arity of the heap
 * @param {function} compare the comparison function
 * @param {array} a the array where the heap is stored
 * @param {int} i is the root element
 * @param {int} j - 1 is the last leaf
 * @param {int} k is the target node
 */

daryheap.sniffup = function ( arity, compare, a, i, j, k ) {

	var current, parent, tmp;

	current = k - i;

	// while we are not the root

	while ( current !== 0 ) {

		// address of the parent in a zero-based
		// d-ary heap

		parent = i + Math.floor( ( current - 1 ) / arity );

		// swap with parent

		tmp = a[i + current];
		a[i + current] = a[parent];
		a[parent] = tmp;

		current = parent - i;

	}

	return i + current;

};
