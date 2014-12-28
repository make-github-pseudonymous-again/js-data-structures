var util , array ;

util = require( "util" ) ;
array = require( "aureooms-js-array" ) ;

test( "sortxy" , function ( ) {

	var n , X , Y , v , w , k , __fn__ , contains , compare ;

	console.log( "sortxy" );

	n = 20 ;

	X = array.alloc( n ) ;
	Y = array.alloc( n ) ;

	array.iota( X , 0 , n , 0 ) ;
	array.iota( Y , 0 , n , 1000 ) ;

	contains = function ( a , x ) {

		var i , y , k ;

		it : for ( i = 0 ; i < a.length ; ++i ) {

			y = a[i] ;

			for ( k = 0 ; k < 4 ; ++k ) {

				if ( x[k] !== y[k] ) {
					continue it ;
				}

			}

			return true ;
		}

		return false ;

	} ;

	v = [] ;
	w = [] ;

	__fn__ = function ( w ) {

		return function ( a , b , c , d ) {
			w.push( [ a , b , c , d ] ) ;
		} ;

	} ;


	compare = function ( a , b , c , d ) {
		return a + b - c - d ;
	} ;


	algo.sortxy_n3( compare , X , Y , 0 , n - 1 , 0 , n - 1 , 0 , n - 1 , 0 , n - 1 , __fn__( v ) ) ;
	algo.sortxy_n4( compare , X , Y , 0 , n - 1 , 0 , n - 1 , 0 , n - 1 , 0 , n - 1 , __fn__( w ) ) ;


	for ( k = 0 ; k < w.length ; ++k ) {

		if ( w[k][0] > w[k][2] ) {
			continue ;
		}

		if ( w[k][0] === w[k][2] && w[k][1] <= w[k][3] ) {
			continue ;
		}

		deepEqual( contains( v , w[k] ), true, w[k] + " in list" ) ;
	}

} ) ;
