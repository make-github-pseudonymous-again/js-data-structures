

var __absepsilon__ = function ( epsilon ) {


	return function ( a, b ) {

		var r;

		r = a - b;

		return r < -epsilon ? -1 : r > epsilon ? 1 : 0;

	};

};

exports.__absepsilon__ = __absepsilon__;
