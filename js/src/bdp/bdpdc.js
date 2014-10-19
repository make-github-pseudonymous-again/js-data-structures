
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
 * select(...) partitions the array in tree regions
 *  -----------------------------
 * |    <= h    | h |    >= h    |
 *  -----------------------------
 * i    ....    k  k+1   ....   j-1
 *
 * __eq__( d, v ) template for a function eq( a )
 *   returns true iff coordinate d of a equals v
 *
 * __ne__( d, v ) template for a function ne( y )
 *   returns true iff coordinate d of a is not equal to v
 *
 * color( point )
 *   = 0 if point is blue
 *   = 1 if point is red
 *
 * p = split( predicate, a, i, j )
 *   rearranges an array so that all elements for which predicate is false
 *   are in interval [i, p[ and all other elements are in interval [p, j[
 *
 * swap( a, ai, aj, b, bi )
 *   swap elements from a in interval [ai, aj[ with elements from b in interval
 *   [bi, bi + aj - ai[
 *
 */


var __bdpdc__ = function ( select, __eq__, __ne__, color, split, swap ) {

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

		var k, h, x, y, p, q, m, n, _m, _n;

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


			//  -------------------------------------------------------
			// |                     b&r scrambled                     |
			//  -------------------------------------------------------
			// i                                                       j

			k = ( i + j ) / 2 | 0;

			//  -------------------------------------------------------
			// |                     b&r scrambled                     |
			//  -------------------------------------------------------
			// i                         k                             j

			// select median element
			// O(n)

			select( __f__( di ), a, i, j, k );

			h = a[k][di];

			//  -------------------------------------------------------
			// |         b&r <= h        | h |         b&r >= h        |
			//  -------------------------------------------------------
			// i                         k                             j


			// we do 3 recursive calls
			//
			// first: for red and blue points with di < h in R^d
			// we do not consider points with di = h because either
			//
			// 1. red = h, blue < h --> handled by last call
			// 2. red < h, blue = h --> red cannot dominate blue
			// 3. red = h, blue = h --> handled by last call
			//    (would be "red cannot dominate blue" for strict dominance
			//    in this 3rd case)
			//
			// second: for red and blue points with di > h in R^d
			// we do not consider points with di = h for similar reasons as above
			//
			// last: for red points with di >= h and blue points with di <= h in R^{d-1}
			// (would be > and < for strict dominance)
			//
			// note that we do not need to handle the case where red < h and blue >= h
			// or red <= h and blue > h since red cannot dominate blue in those cases

			// first recursive call
			// we only consider points that have di < h
			// since all points that have di = h will be handled later

			// move median elements from [ i, k [ in the [ x, k [ interval, x >= i
			// O(n)

			x = split( __eq__( di, h ), a, i, k );

			//  -------------------------------------------------------
			// |    b&r < h    | b&r = h | h |         b&r > h         |
			//  -------------------------------------------------------
			// i               x         k                             j

			bdpdc( __f__, a, i, x, di, dj, out );

			// move median elements from [ k + 1, j [ in the [ y, j [ interval, y <= j
			// O(n)

			y = split( __ne__( di, h ), a, k + 1, j );

			//  -------------------------------------------------------
			// |    b&r < h    | b&r = h | h | b&r = h |    b&r > h    |
			//  -------------------------------------------------------
			// i               x         k             y               j

			bdpdc( __f__, a, y, j, di, dj, out );

			// since we do not touch median elements in the first two
			// recursive calls they are still at the correct place

			// Now we want to
			//   - move red points such that di < h to the right
			//   - move red points such that di >= h to the left
			//
			// /!\ Note that we also might think that we should
			//   - move blue points such that di > h to the right
			//   - move blue points such that di <= h to the left
			// but after the selection algorithm this is already the case


			//  -------------------------------------------------------
			// |    b&r < h    | b&r = h | h | b&r = h |    b&r > h    |
			//  -------------------------------------------------------
			// i               x         k             y               j

			p = split( color, a, i, x );

			//  -------------------------------------------------------
			// | b < h | r < h | b&r = h | h | b&r = h |    b&r > h    |
			//  -------------------------------------------------------
			// i       p       x         k             y               j

			q = split( color, a, y, j );

			//  -------------------------------------------------------
			// | b < h | r < h | b&r = h | h | b&r = h | b > h | r > h |
			//  -------------------------------------------------------
			// i       p       x         k             y       q       j

			// we now want to swap r < h elements with r > h elements
			// we have 3 cases
			//   1. x - p = j - q
			//   2. x - p < j - q
			//   3. x - p > j - q

			m = x - p;
			n = j - q;


			//   1. x - p = j - q

			if ( m === n ) {
				swap( a, q, j, a, p );

				//  -------------------------------------------------------
				// | b < h | r > h | b&r = h | h | b&r = h | b > h | r < h |
				//  -------------------------------------------------------
				// i       p       x         k             y       q       j

				j = y;

				//  -------------------------------------------------------
				// | b < h | r > h | b&r = h | h | b&r = h | b > h | r < h |
				//  -------------------------------------------------------
				// i       p       x         k             j      ...

			}


			//   2. x - p < j - q

			else if ( m < n ) {

				swap( a, p, x, a, q );

				//  ---------------------------------------------------------------
				// | b < h | r > h | b&r = h | h | b&r = h | b > h | r < h | r > h |
				//  ---------------------------------------------------------------
				// i       p       x         k             y       q      q+m      j

				// we now want to swap b > h and r < h elements with r > h elements
				//                     [y,q[    [q,q+m[             [q+m,j[
				// we have 2 cases
				//   1. (q + m) - y >= j - (q + m) [OR  >]
				//   2. (q + m) - y  < j - (q + m) [OR <=]

				_m = (q + m) - y;
				_n = j - (q + m);

				//   1. (q + m) - y >= j - (q + m)
				if ( _m >= _n ) {
					swap( a, q + m, j, a, y );
				}
				//   2. (q + m) - y  < j - (q + m)
				else {
					swap( a, j - _m, j, a, y );
				}

				//  ---------------------------------------------------------------
				// | b < h | r > h | b&r = h | h | b&r = h | r > h |   b>h & r<h   |
				//  ---------------------------------------------------------------
				// i       p       x         k             y      y+_n             j

				j = y + _n;

				//  ---------------------------------------------------------------
				// | b < h | r > h | b&r = h | h | b&r = h | r > h |   b>h & r<h   |
				//  ---------------------------------------------------------------
				// i       p       x         k             y       j      ...

			}


			//   3. x - p > j - q

			else {

				swap( a, q, j, a, p );

				//  ---------------------------------------------------------------
				// | b < h | r > h | r < h | b&r = h | h | b&r = h | b > h | r < h |
				//  ---------------------------------------------------------------
				// i       p      p+n      x         k             y       q       j

				// we now want to swap r < h with b&r = h elements
				// we have 2 cases
				//   1. x - (p + n) >= y - x
				//   2. x - (p + n)  < y - x

				_m = x - (p + n);
				_n = y - x;

				//   1. x - (p + n) >= y - x
				if ( _m >= _n ) {
					swap( a, x, y, a, p + n );
				}
				//   2. x - (p + n)  < y - x
				else {
					swap( a, y - _m, y, a, p + n );
				}

				//  -----------------------------------------------------------
				// | b < h | r > h |     b&r = h     | h | b&r = h | b>h & r<h |
				//  -----------------------------------------------------------
				// i       p      p+n                k            y-_m         j

				j = y - _m;

				//  -----------------------------------------------------------
				// | b < h | r > h |     b&r = h     | h | b&r = h | b>h & r<h |
				//  -----------------------------------------------------------
				// i       p      p+n                k             j    ...

			}

			// [i, j[ now contains only b <= h and r >= h points
			// in this new interval, all r points dominate b points
			// for the ith coordinate
			// we can thus ask the recursion fairy to take care of the other
			// dj - di - 1 dimensions left

			bdpdc( __f__, a, i, j, di + 1, dj, out );

			return out;
		}

	};

	return bdpdc;

};

exports.__bdpdc__ = __bdpdc__;
