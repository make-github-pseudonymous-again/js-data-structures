test('karatsuba 16 big endian', function(assert){

	var ia2a = function(a) {
		var o = [];
		var i = a.length;
		while(i--){
			o[i] = a[i];
		}
		return o;
	};

	var r = Math.pow(2, 16);
	var add = algo.badd_t(r);
	var sub = algo.bsub_t(r);
	var num = Uint16Array;
	var mov = algo.copy;


	var bkaratsuba = algo.bkaratsuba_t(add, sub, undefined, num, mov, r);

	var a = new num(4), b = new num(4), c = new num(8);

	a[3] = 4;
	b[3] = 4;
	bkaratsuba(a, 0, 4, b, 0, 4, c, 0, 8);
	deepEqual(ia2a(c), [0, 0, 0, 0, 0, 0, 0, 16], '4 * 4');

	a[3] = 16;
	b[3] = 16;
	bkaratsuba(a, 0, 4, b, 0, 4, c, 0, 8);
	deepEqual(ia2a(c), [0, 0, 0, 0, 0, 0, 0, 256], '16 * 16');

	a[3] = 32;
	b[3] = 16;
	bkaratsuba(a, 0, 4, b, 0, 4, c, 0, 8);
	deepEqual(ia2a(c), [0, 0, 0, 0, 0, 0, 0, 512], '32 * 16');

	a[3] = 16;
	b[3] = 64;
	bkaratsuba(a, 0, 4, b, 0, 4, c, 0, 8);
	deepEqual(ia2a(c), [0, 0, 0, 0, 0, 0, 0, 1024], '16 * 64');

});


test('karatsuba 8 big endian', function(assert){

	var ia2a = function(a) {
		var o = [];
		var i = a.length;
		while(i--){
			o[i] = a[i];
		}
		return o;
	};

	var r = Math.pow(2, 8);
	var add = algo.badd_t(r);
	var sub = algo.bsub_t(r);
	var num = Uint8Array;
	var mov = algo.copy;


	var bkaratsuba = algo.bkaratsuba_t(add, sub, undefined, num, mov, r);

	var a = new num(4), b = new num(4), c = new num(8);

	a[3] = 4;
	b[3] = 4;
	bkaratsuba(a, 0, 4, b, 0, 4, c, 0, 8);
	deepEqual(ia2a(c), [0, 0, 0, 0, 0, 0, 0, 16], '4 * 4');

	a[3] = 16;
	b[3] = 16;
	bkaratsuba(a, 0, 4, b, 0, 4, c, 0, 8);
	deepEqual(ia2a(c), [0, 0, 0, 0, 0, 0, 1, 0], '16 * 16');

	a[3] = 32;
	b[3] = 16;
	bkaratsuba(a, 0, 4, b, 0, 4, c, 0, 8);
	deepEqual(ia2a(c), [0, 0, 0, 0, 0, 0, 2, 0], '32 * 16');

	a[3] = 16;
	b[3] = 64;
	bkaratsuba(a, 0, 4, b, 0, 4, c, 0, 8);
	deepEqual(ia2a(c), [0, 0, 0, 0, 0, 0, 4, 0], '16 * 64');

	a[3] = 255;
	b[3] = 255;
	bkaratsuba(a, 0, 4, b, 0, 4, c, 0, 8);
	deepEqual(ia2a(c), [0, 0, 0, 0, 0, 0, 254, 1], '255 * 255');

	mov(c, 4, 8, a, 0, 4);
	b[3] = 0;
	b[2] = 1;
	bkaratsuba(a, 0, 4, b, 0, 4, c, 0, 8);
	deepEqual(ia2a(c), [0, 0, 0, 0, 0, 254, 1, 0], '255 * 255 * 256');

	b[3] = 200;
	b[2] = 100;
	a[3] = 200;
	a[2] = 100;
	bkaratsuba(a, 0, 4, b, 0, 4, c, 0, 8);
	deepEqual(ia2a(c), [0, 0, 0, 0, 39, 172, 220, 64], '25800 * 25800');

});