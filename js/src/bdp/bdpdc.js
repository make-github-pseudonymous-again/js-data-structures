
/**
 * Bichromatic dominating pairs using the divide and conquer chainsaw.
 *
 * see F. P. Preparata and M. I. Shamos, Computational Geometry, NY, 1985, p. 366.
 *
 * Here the algorithm handles non-strict ( >= ) dominance.
 *
 * select( f, a, i, j, k ) where
 *   f is a comparator
 *   a the array of points
 *   [i, j[ the range to search in the array
 *   k the index to select
 *
 * select partitions the array in tree regions
 *  -----------------------------
 * |    <= h    | h |    >= h    |
 *  -----------------------------
 *  0 ...... k-1  k  k+1 .... j-1
 *
 * eq( a, b )
 *   returns true iff coordinate a equals coordinate b
 *
 * color( a )
 *   = 0 if point is blue
 *   = 1 if point is red
 *
 */


var __bdpdc__ = function ( select, eq, color, split, swap ) {

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

	var bdpdc = function ( __f__, a, i, j, di, dj, out ) {

		var h, m, k, x, y, tmp, p, q;

		// empty or one element array case

		if ( i >= j - 1 ) {
			return out;
		}

		// base case : dj - di = d = 0
		// enumerate all red / blue pairs
		// [i, p[ contains only blue points
		// [p, j[ contains only red points
		// p = index of first red point

		if ( di === dj ) {

			// move all blue points left and all red points right
			// (arbitrary choice)

			p = split( color, a, i, j );

			// for each red point

			for ( x = p ; x < j ; ++x ) {

				// for each blue point

				for ( y = i ; y < p ; ++y ) {

					out.push( [ a[x], a[y] ] );

				}
			}

			return out;

		}

		/**
		 * recursion fairy
		 *
		 * we compute m such that h is the median of
		 * the ith coordinate of all points
		 *
		 */

		else {

			m = ( i + j ) / 2 | 0;

			// select median element
			// O(n)

			select( __f__( di ), a, i, j, m );

			h = a[m][di];

			// we do 3 recursive calls
			//
			// first for red and blue points with di < h in R^d
			// we do not consider points with di = h because either
			//
			// 1. red = h, blue < h --> handled by last call
			// 2. red < h, blue = h --> red cannot dominate blue
			// 3. red = h, blue = h --> handled by last call
			//    (would be "red cannot dominate blue" for strict dominance)
			//
			// second for red and blue points with di > h in R^d
			// we do not consider points with di = h for similar reasons as above
			//
			// last for red points with di >= h and blue points with di <= h in R^{d-1}
			// (would be > and < for strict dominance)
			//
			// note that we do not need to handle the case where red < h and blue >= h
			// or red <= h and blue > h since red cannot domminate blue in those cases

			// first recursive call
			// we only consider points that have di < h
			// since all points that have di === h will be handled later

			// move median elements from a_i to a_m - 1
			// in the [ x + 1, m [ interval
			// O(n)

			x = m - 1;

			// note : last swap skipped since not needed

			for ( k = i ; k < x ; ++k ) {
				tmp = a[k];
				if ( eq( tmp[di], h ) ) {
					a[k] = a[x];
					a[x] = tmp;
					--x;
				}
			}

			bdpdc( __f__, a, i, x + 1, di, dj, out );

			// move median elements from a_m to a_j - 1
			// in the ] m, y - 1 ] interval
			// O(n)

			y = m + 1;

			// note : last swap skipped since not needed

			for ( k = j - 1 ; k > y ; --k ) {
				tmp = a[k];
				if ( eq( tmp[di], h ) ) {
					a[k] = a[y];
					a[y] = tmp;
					++y;
				}
			}

			bdpdc( __f__, a, y, j, di, dj, out );

			// since we do not touch median elements in the first two
			// recursive calls they are still at the correct place

			// move red points such that di < h to the right
			// move red points such that di >= h to the left
			//
			// Note that we also might think that we should /!\
			//   - move blue points such that di > h to the right
			//   - move blue points such that di <= h to the left
			// but after the selection algorithm this is already the case


			p = split( color, a, i, x + 1 );
			q = split( color, a, y, j );


			swap( a, q, q + x + 1 - p, a, p );
			swap( a, q + x + 1 - p + j - p - p + y) , j, a, y );


			bdpdc( __f__, a, i, m + k, di + 1, dj, out );

			return out;
		}

	};

};

exports.__bdpdc__ = __bdpdc__;
