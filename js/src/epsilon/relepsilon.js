
var __relepsilon__ = function ( epsilon ) {


	return function ( a, b ) {

		var r;

		if ( b === 0 ) {
			return a;
		}

		else if ( a === 0 ) {
			return -b;
		}

		else {

			r = a / b - 1;

			return r < -epsilon ? -1 : r > epsilon ? 1 : 0;

		}

	};

};

exports.__relepsilon__ = __relepsilon__;
