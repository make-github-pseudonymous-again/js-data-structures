


var fiter = function ( i, j, fn ) {
	for ( ; i < j ; ++i ) {
		fn( i );
	}
};

var biter = function ( i, j, fn ) {
	while ( --j >= i ) {
		fn( j );
	}
};



exports.fiter = fiter;
exports.biter = biter;
