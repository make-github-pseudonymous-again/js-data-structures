
/**
 * @param r base (radix)
 */


var bsub_t = function(r){

	/**
	 * Subtracts two big endian arrays, k >= i >= j
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
		var t, T, C = 0;

		while(--j1 >= j0){
			--i1; --k1;
			T = C;
			C = a[i1] < b[j1] + T;
			c[k1] = a[i1] - b[j1] + (C*r - T);
		}

		while(--i1 >= i0){
			--k1;
			T = C;
			C = a[i1] < T;
			c[k1] = a[i1] + (C*r - T);
		}

		if(C){
			while(--k1 >= k0){
				c[k0] = r - 1;
			}
		}

	};
};
/**
 * @param r base (radix)
 */


var lsub_t = function(r){

	/**
	 * Subtracts two little endian arrays, k >= i >= j
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
		var t, T, C = 0;

		while(j0 < j1){
			T = C;
			C = a[i0] < b[j0] + T;
			c[k0] = a[i0] - b[j0] + (C*r - T);
			++i0; ++j0; ++k0;
		}

		while(i0 < i1){
			T = C;
			C = a[i0] < T;
			c[k0] = a[i0] + (C*r - T);
			++i0; ++k0;
		}

		if(C){
			while(k0 < k1){
				c[k0] = r - 1;
				++k0;
			}
		}

	};
};


exports.bsub_t = bsub_t;
exports.lsub_t = lsub_t;
