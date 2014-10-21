
/**
 * Updates the value of a target node and
 * updates its position.
 *
 * Hypothesis : i <= j
 *
 * @param {int} arity arity of the heap
 * @param {function} compare the comparison function
 * @param {array} a the array where the heap is stored
 * @param {int} i is the root element
 * @param {int} j - 1 is the last leaf
 * @param {int} k is the target node
 * @param {value} value is the target node's new value
 */

daryheap.update = function ( arity, compare, a, i, j, k, value ) {

	var d;

	d = compare( value, a[k] );

	if ( d < 0 ) {
		return daryheap.decreasekey( arity, compare, a, i, j, k, value );
	}

	else if ( d > 0 ) {
		return daryheap.increasekey( arity, compare, a, i, j, k, value );
	}

	else{

		// d === 0 does not imply a[k] === value

		a[k] = value;

		return k;

	}

};
