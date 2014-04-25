/**
 * /!\ BLOCK MULTIPLICATION RESULT MUST HOLD IN THE JAVASCRIPT NUMBER TYPE (DOUBLE i.e. 53 bits)
 *
 * 
 * @param {function} add addition algorithm
 * @param {function} sub subtraction algorithm
 * @param {function} mul multiplication algorithm
 * @param {function} copy copy algorithm
 * @param {prototype} num array ctor
 * @param {uint} r base (radix)
 *
 * 
 * EXPLANATION
 * ###########
 * 
 * a.b = (a1.r^{n} + a0).(b1.r^{n} + b0)
 *     = a1.b1.r^{2n} + (a1.b0 + a0.b1).r^{n} + a0.b0
 *     = z2.r^{2n} + z1.r^{n} + z0
 *       
 * z2 = a1.b1
 * z1 = a1.b0 + a0.b1
 * z0 = a0.b0
 *       
 * (a1 + a0)(b1 + b0) = a1.b1 + a0.b0 + (a1.b0 + a0.b1)
 *                    = z2 + z0 + z1
 *                    
 * z1 = (a1 + a0)(b1 + b0) - z2 - z0
 *
 * AN ANOTHER WAY AROUND (not used here)
 *
 * (a1 - a0)(b1 - b0) = a1.b1 + a0.b0 - (a1.b0 + a0.b1)
 * (a0 - a1)(b1 - b0) = (a1.b0 + a0.b1) - a1.b1 + a0.b0
 * a.b = (r^{2n} + r^{n})a1.b1 + r^{n}(a0 - a1)(b1 - b0) + (r^{n} + 1)a0.b0,
 */

var bkaratsuba_t = function(add, sub, mul, num, mov, r, wrap){

	/**
	 * Multiply two big endian arrays using karatsuba algorithm,
	 * i >= j, k >= 2 * i
	 * 
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

	var karatsuba = function(a, i0, i1, b, j0, j1, c, k0, k1){

		var z0, z2, t1, t2, t3, p, I, P, P_, i_, j_;

		var i = i1 - i0,
		j = j1 - j0,
		k = k1 - k0;

		// EMPTY CASE
		if(i <= 0 || j <= 0 || k <= 0) return;

		// BASE CASE i = j = 1
		if(i === 1){
			z0 = a[i0] * b[j0];
			c[k1-1] = z0 % r;

			if(k > 1)
				c[k1-2] = (z0 - c[k1-1]) / r;

		}

		// RECURSION
		else{
			p = Math.ceil(i / 2);
			I = i + j;
			P = 2 * p;
			P_ = I - P;
			i_ = i1 - p;
			j_ = Math.max(j0, j1 - p);

			t1 = new num(p+1); // + 1 to handle addition overflows
			t2 = new num(p+1); // and guarantee reducing k for the
			t3 = new num(P+1); // recursive calls
			z2 = new num(P_);
			z0 = new num(P);
			
		// RECURSIVE CALLS
			mul(a, i0, i_, b, j0, j_, z2, 0, P_);            // z2 = a1.b1
			mul(a, i_, i1, b, j_, j1, z0, 0, P);             // z0 = a0.b0
			add(a, i_, i1, a, i0, i_, t1, 0, p + 1);         // (a0 + a1)
			add(b, j0, j_, b, j_, j1, t2, 0, p + 1);         // (b1 + b0)
			mul(t1, 1, p + 1, t2, 1, p + 1, t3, 1, P + 1);   // (a0 + a1)(b1 + b0)

		// BUILD OUTPUT
			mov(z2, 0, P_, c, k1 - I);                       // + z2 . r^{2n}
			mov(z0, 0, P , c, k1 - P);                       // + z0
			if(t1[0])                                        // overflow on t1, add t2 . r^{p}
			add(t3, 0, P + 1 - p, t2, 1, p + 1, t3, 0, P + 1 - p);
			if(t2[0])                                        // overflow on t2, add t1 . r^{p}
			add(t3, 0, P + 1 - p, t1, 1, p + 1, t3, 0, P + 1 - p);
			if(t1[0] && t2[0])                               // overflow on t1 and t2, add 1 . r^{p+1}
			add(t3, 0, P - p, t1, 0, 1, t3, 0, P - p);
			add(c, k0, k1 - p, t3, 0, P + 1, c, k0, k1 - p); // + (a0 + a1)(b1 + b0) . r^{n}
			sub(c, k0, k1 - p, z2, 0, P_, c, k0, k1 - p);    // - z2 . r^{n}
			sub(c, k0, k1 - p, z0, 0, P, c, k0, k1 - p);     // - z1 . r^{n}
		}

	};

	if(wrap !== undefined) karatsuba = wrap(karatsuba);
	if(mul === undefined) mul = karatsuba;

	return karatsuba;

};


exports.bkaratsuba_t = bkaratsuba_t;