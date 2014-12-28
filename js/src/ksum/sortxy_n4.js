
/**
 * X is sorted in increasing order
 * Y is sorted in increasing order
 * compare takes 4 arguments and returns <=> 0
 * output takes 4 arguments
 *
 */
var sortxy_n4 = function ( compare , X , Y ,  Xi1 , Xj1 , Yi1 , Yj1 , Xi2 , Xj2 , Yi2 , Yj2 , output ) {

	var a , b , c , d , s ;

	if ( Xi1 > Xj1 || Yi1 > Yj1 || Xi2 > Xj2 || Yi2 > Yj2 ) {
		return ;
	}

	//  -----------------------------
	// |              X              |
	//  -----------------------------
	// Xi                           Xj

	//  -----------------------------
	// |              Y              |
	//  -----------------------------
	// Yi                           Yj

	a = X[Xi1] ;
	b = Y[Yi1] ;
	c = X[Xi2] ;
	d = X[Yi2] ;

	s = compare( a , b , c , d ) ;

	if ( s === 0 ) {

		output( Xi1 , Yj1 , Xj2 , Yi2 ) ;

	}

	sortxy( compare , X , Y , Xi1 + 1 , Xj1 , Yi1 , Yj1 , Xi2 , Xj2 , Yi2 , Yj2 , output ) ;
	sortxy( compare , X , Y , Xi1 , Xi1 , Yi1 + 1 , Yj1 , Xi2 , Xj2 , Yi2 , Yj2 , output ) ;
	sortxy( compare , X , Y , Xi1 , Xi1 , Yi1 , Yi1 , Xi2 + 1 , Xj2 , Yi2 , Yj2 , output ) ;
	sortxy( compare , X , Y , Xi1 , Xi1 , Yi1 , Yi1 , Xi2 , Xi2 , Yi2 + 1 , Yj2 , output ) ;

} ;

exports.sortxy_n4 = sortxy_n4 ;
