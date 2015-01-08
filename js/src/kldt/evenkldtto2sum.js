

/**
 * Transforms an instance of the one-set version of kLDT with k >= 4 even into
 * a two-set version of 2SUM.
 *
 * @param {set} S is the input set for the kLDT problem
 * @param {coefficients} a is the array of coefficients
 * @param {set} A is one of the input set for 2SUM
 * @param {set} B is one of the input set for 2SUM
 *
 * notes:
 *   - n = Sj - Si
 *   - k = aj - ai - 1
 *   - a_0 = a[ai]
 *   - A and B must be of size n^(k/2) each
 *   - B must be initialized to 0 ... 0
 *
 */

var evenkldtto2sum = function ( S , Si , Sj , a , ai , aj , A , Ai , Aj , B , Bi , Bj ) {

	var i , j , p , q , n , halfk ;

	n = Sj - Si ;

	k = aj - ai - 1 ;

	halfk = 1 + k / 2 ;

	// We fill A and B for example with S = [ 1 , 2 , 3 ] and a = [ t , v , w , x , y ]

	//       -----------------------------------------------------------------------
	// A <- |   t   |   t   |   t   |   t   |   t   |   t   |   t   |   t   |   t   |
	//       -----------------------------------------------------------------------

	for ( p = Ai ; p < Aj ; ++p ) {

		A[p] = a[ai] ;

	}

	//       -----------------------------------------------------------------------
	// A += | v * 1 | v * 2 | v * 3 | v * 1 | v * 2 | v * 3 | v * 1 | v * 2 | v * 3 |
	//       -----------------------------------------------------------------------
	//       -----------------------------------------------------------------------
	// A += | w * 1 | w * 1 | w * 1 | w * 2 | w * 2 | w * 2 | w * 3 | w * 3 | w * 3 |
	//       -----------------------------------------------------------------------

	for ( j = 1 , i = 1 ; j < halfk ; ++j , i *= n ) {

		for ( p = Ai , q = 0 ; p < Aj ; ++p , q = ( ( q + 1 ) / i | 0 ) % n ) {

			A[p] += a[ai + j] * S[Si + q] ;

		}

	}

	//       -----------------------------------------------------------------------
	// B += | x * 1 | x * 2 | x * 3 | x * 1 | x * 2 | x * 3 | x * 1 | x * 2 | x * 3 |
	//       -----------------------------------------------------------------------
	//       -----------------------------------------------------------------------
	// B += | y * 1 | y * 1 | y * 1 | y * 2 | y * 2 | y * 2 | y * 3 | y * 3 | y * 3 |
	//       -----------------------------------------------------------------------

	for ( i = 1 ; j <= k ; ++j , i *= n ) {

		for ( p = Bi , q = 0 ; p < Bj ; ++p , q = ( ( q + 1 ) / i | 0 ) % n ) {

			B[p] += a[ai + j] * S[Si + q] ;

		}

	}

} ;

exports.evenkldtto2sum = evenkldtto2sum;
