
/**
 * @param r base (radix)
 */


var badd_t = function(r){


	/**
	 * Adds two big endian arrays, k >= i >= j
	 * wraps
	 * 
	 * @param a first operand
	 * @param i0 a left
	 * @param i1 a right
	 * @param b second operand
	 * @param j0 b left
	 * @param j1 b right
	 * @param c result, must be 0 initialized
	 * @param k0 c left
	 * @param k1 c right
	 */

	return function(a, i0, i1, b, j0, j1, c, k0, k1){
		var t, C = 0;

		while(--j1 >= j0){
			--i1; --k1;
			t = a[i1] + b[j1] + C;
			c[k1] = t % r;
			C = t / r >= 1;
		}

		while(--i1 >= i0){
			--k1;
			t = a[i1] + C;
			c[k1] = t % r;
			C = t / r >= 1;
		}

		if(--k1 >= k0){
			c[k1] = +C;
		}

	};

};


/**
 * @param r base (radix)
 */

var ladd_t = function(r){

	/**
	 * Adds two little endian arrays, k >= i >= j
	 * wraps
	 * 
	 * @param a first operand
	 * @param i0 a left
	 * @param i1 a right
	 * @param b second operand
	 * @param j0 b left
	 * @param j1 b right
	 * @param c result, must be 0 initialized
	 * @param k0 c left
	 * @param k1 c right
	 */

	return function(a, i0, i1, b, j0, j1, c, k0, k1){
		var t, C = 0;

		while(j0 < j1){
			t = a[i0] + b[j0] + C;
			c[k0] = t % r;
			C = t / r >= 1;
			++i0; ++j0; ++k0;
		}

		while(i0 < i1){
			t = a[i0] + C;
			c[k0] = t % r;
			C = t / r >= 1;
			++i0; ++k0;
		}

		if(k0 < k1){
			c[k0] = +C;
		}

	};
};

exports.badd_t = badd_t;
exports.ladd_t = ladd_t;