

/**
 *
 * Computes the probability ( [0, 1] ) for at least 1 of k people
 * out of n to have his birthday the same day as someone else.
 *
 * hypothesis : k <= n and k <= days
 */

var samebirthday = function ( k, n, days ) {

	var i, p;

	p = 1;

	for ( i = 1 ; i < k ; ++i ) {

		p = p * ( days - i ) / days;

	}

	for ( ; i < n ; ++i ) {

		p = p * ( days - k ) / days;

	}


	return 1 - p;

};

exports.samebirthday = samebirthday;
