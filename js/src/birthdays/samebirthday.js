

/**
 * hypothesis : k <= n
 */

var samebirthday = function ( k, n, days ) {

	var i, p;

	p = 1;

	for ( i = 0 ; i < k ; ++i ) {

		p = p * ( days - i ) / days;

	}

	for ( ; i < n ; ++i ) {

		p = p * ( days - k ) / days;

	}


	return 1 - p;

};

exports.samebirthday = samebirthday;
