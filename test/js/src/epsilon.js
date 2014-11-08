

test ( "epsilon", function ( ) {

	var absepsilon, relepsilon, epsilon;

	epsilon = Math.pow( 2, -10 );
	morethanepsilon = epsilon + epsilon / 128;

	absepsilon = algo.__absepsilon__( epsilon );
	relepsilon = algo.__relepsilon__( epsilon );


	ok( absepsilon( 0, 0 ) === 0, " absolute 0 === 0 " );
	ok( relepsilon( 0, 0 ) === 0, " relative 0 === 0 " );


	ok( absepsilon(  epsilon, 0 ) === 0, " absolute  e ===  0 " );
	ok( absepsilon( -epsilon, 0 ) === 0, " absolute -e ===  0 " );
	ok( absepsilon( 0,  epsilon ) === 0, " absolute  0 ===  e " );
	ok( absepsilon( 0, -epsilon ) === 0, " absolute  0 === -e " );

	ok( relepsilon(  epsilon, 0 )  >  0, " relative  e  >   0 " );
	ok( relepsilon( -epsilon, 0 )  <  0, " relative -e  <   0 " );
	ok( relepsilon( 0,  epsilon )  <  0, " relative  0  <   e " );
	ok( relepsilon( 0, -epsilon )  >  0, " relative  0  >  -e " );


	ok( absepsilon(  morethanepsilon, 0 )  >  0, " absolute  e'  >   0  " );
	ok( absepsilon( -morethanepsilon, 0 )  <  0, " absolute -e'  <   0  " );
	ok( absepsilon( 0,  morethanepsilon )  <  0, " absolute  0   <   e' " );
	ok( absepsilon( 0, -morethanepsilon )  >  0, " absolute  0   <  -e' " );

	ok( relepsilon(  morethanepsilon, 0 )  >  0, " relative  e'  >   0  " );
	ok( relepsilon( -morethanepsilon, 0 )  <  0, " relative -e'  <   0  " );
	ok( relepsilon( 0,  morethanepsilon )  <  0, " relative  0   <   e' " );
	ok( relepsilon( 0, -morethanepsilon )  >  0, " relative  0   >  -e' " );


	ok( absepsilon( 1 + epsilon, 1 ) === 0, " absolute  1 + e ===  1 " );
	ok( absepsilon( 1 - epsilon, 1 ) === 0, " absolute  1 - e ===  1 " );
	ok( absepsilon( 1, 1 + epsilon ) === 0, " absolute  1     ===  1 + e " );
	ok( absepsilon( 1, 1 - epsilon ) === 0, " absolute  1     ===  1 - e " );

	ok( relepsilon( 1 * ( 1 + epsilon ), 1 ) === 0, " relative  1 * ( 1 + e ) ===  1 " );
	ok( relepsilon( 1 / ( 1 + epsilon ), 1 ) === 0, " relative  1 / ( 1 + e ) ===  1 " );
	ok( relepsilon( 1, 1 * ( 1 + epsilon ) ) === 0, " relative  1     ===  1 * ( 1 + e ) " );
	ok( relepsilon( 1, 1 / ( 1 + epsilon ) ) === 0, " relative  1     ===  1 / ( 1 + e ) " );

	ok( absepsilon( 1 + morethanepsilon, 1 )  >  0, " absolute  1 + e'  >  1 " );
	ok( absepsilon( 1 - morethanepsilon, 1 )  <  0, " absolute  1 - e'  <  1 " );
	ok( absepsilon( 1, 1 + morethanepsilon )  <  0, " absolute  1       <  1 + e' " );
	ok( absepsilon( 1, 1 - morethanepsilon )  >  0, " absolute  1       >  1 - e' " );

	ok( relepsilon( 1 * ( 1 + morethanepsilon ), 1 )  >  0, " relative  1 * ( 1 + e' ) >  1 " );
	ok( relepsilon( 1 / ( 1 + morethanepsilon ), 1 )  <  0, " relative  1 / ( 1 + e' ) <  1 " );
	ok( relepsilon( 1, 1 * ( 1 + morethanepsilon ) )  <  0, " relative  1     <  1 * ( 1 + e' ) " );
	ok( relepsilon( 1, 1 / ( 1 + morethanepsilon ) )  >  0, " relative  1     >  1 / ( 1 + e' ) " );



} );
