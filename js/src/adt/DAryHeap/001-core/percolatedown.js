

/**
 * Percolates down a node.
 *
 * @param {int} arity arity of the heap
 * @param {function} compare the comparison function
 * @param {array} a the array where the heap is stored
 * @param {int} i is the root element
 * @param {int} j - 1 is the last leaf
 * @param {int} k is the target node
 */

daryheap.percolatedown = function ( arity, compare, a, i, j, k ) {

	var current, candidate, firstchild, tmp;

	current = k - i;

	while ( true ) {

		// address of the first child in a zero-based
		// d-ary heap

		firstchild = arity * current + 1;

		// if current node has no children
		// then we are done

		if ( firstchild >= j - i ) {
			return;
		}

		// if current value is smaller than its smallest
		// child then we are done

		candidate = daryheap.nextchild( arity, compare, a, i + firstchild, j );

		if ( compare( a[i + current], a[candidate] ) <= 0 ) {
			return;
		}

		// otherwise
		// swap with smallest child

		tmp = a[i + current];
		a[i + current] = a[candidate];
		a[candidate] = tmp;

		current = candidate - i;

	}

	return i + current;

};
