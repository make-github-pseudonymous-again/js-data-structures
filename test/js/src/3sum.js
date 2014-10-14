var util, array;

util = require( "util" );
array = require( "aureooms-js-array" );

test("3sum", function(){

	console.log("3sum");

	var iota = array.iota;

	var n = 100;

	var A = new Array(n);
	var B = new Array(n);
	var C = new Array(n);

	iota(A, 0, n, -n/2);
	iota(B, 0, n, -n/2);
	iota(C, 0, n, -n/2);

	var contains = function(a, x) {
		var i, y, k;
		it : for (i = 0; i < a.length; ++i) {
			y = a[i];
			for (k = 0; k < 3; ++k) {
				if (x[k] !== y[k]) continue it;
			}
			return true;
		}
		return false;
	};

	var _3sum_n3 = function(A, ai, aj, B, bi, bj, C, ci, cj, fn) {
		var a, b, c, i, j, k;
		for (i = ai; i < aj; ++i) {
			a = A[i];
			for (j = bi; j < bj; ++j) {
				b = B[j];
				for (k = ci; k < cj; ++k) {
					c = C[k];
					if (a + b + c === 0) {
						fn(a, b, c);
					}
				}
			}
		}
	};

	_3sum_n2 = algo._3sum_n2;

	var w = [];
	var u = [];

	var __fn__ = function (w) {
		return function(a, b, c) {
			w.push([a, b, c]);
		};
	};

	var fnw = __fn__(w);
	var fnu = __fn__(u);


	_3sum_n2(A, 0, n, B, 0, n, C, 0, n, fnw);
	_3sum_n3(A, 0, n, B, 0, n, C, 0, n, fnu);


	deepEqual(w.length, u.length, "length check");

	var k;
	for (k = 0; k < w.length; ++k) {
		deepEqual(contains(u, w[k]), true, w[k] + " in list");
	}

});
