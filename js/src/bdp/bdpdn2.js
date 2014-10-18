
/**
 * Bichromatic dominating pairs using a naïve O(d * n^2) algorithm.
 *
 * Here the algorithm handles non-strict ( >= ) dominance.
 *
 * color( point )
 *   = 0 if point is blue
 *   = 1 if point is red
 *
 * p = split( predicate, a, i, j )
 *   rearranges an array so that all elements for which predicate is false
 *   are in interval [i, p[ and all other elements are in interval [p, j[
 *
 */


var __bdpdn2__ = function ( color, split ) {

	/**
	 * a is an array of points
	 *
	 *     note that we only consider points starting
	 *     at index i and ending at index j-1 in a
	 *
	 * points are arrays of coordinates
	 *
	 *     d = dj - di is the number of coordinates of each point
	 *
	 *
	 * __f__ is a template for a function {coordinates^2} -> {<0, =0, >0} named f
	 *
	 *     i.e. for coordinates a and b
	 *
	 *       f( a, b ) < 0 means a < b;
	 *       f( a, b ) = 0 means a = b;
	 *       f( a, b ) > 0 means a > b.
	 *
	 * out is the output array
	 *
	 */

	var bdpdn2 = function ( __f__, a, i, j, di, dj, out ) {

		var x, y, p, d, f;

		// empty or one element array case

		if ( i >= j - 1 ) {
			return out;
		}

		// move all blue points left and all red points right
		// (arbitrary choice)

		// [i, p[ contains only blue points
		// [p, j[ contains only red points
		// p = index of first red point

		p = split( color, a, i, j );

		// for each red point

		red : for ( x = p ; x < j ; ++x ) {

			// for each blue point

			blue : for ( y = i ; y < p ; ++y ) {

				for ( d = di ; d < dj ; ++d ) {

					f = __f__( d );

					if ( f( a[x], a[y] ) < 0 ) {
						continue blue;
					}

				}

				out.push( [ a[x], a[y] ] );

			}
		}

		return out;

	};

	return bdpdn2;

};

exports.__bdpdn2__ = __bdpdn2__;
