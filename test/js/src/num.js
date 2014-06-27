test('num', function(assert){

	var lcm = algo.lcm_t(algo.gcd);

	deepEqual(algo.gcd(2*3*5*7*13, 2*2*2*5*7*11*13*17), 2*5*7*13, 'gcd value');
	deepEqual(lcm(2*3*5*7*13, 2*2*2*5*7*11*13*17), 3 * 2*2*11*17 * 2*5*7*13, 'lcm value');


	deepEqual(algo.gcd(7168718631, 261736816281), algo.gcd(261736816281, 7168718631), 'gcd order');
	deepEqual(lcm(7168718631, 261736816281), lcm(261736816281, 7168718631), 'lcm order');

	deepEqual(algo.le(0, 1), 0 <=  1, 'le');
	deepEqual(algo.lt(0, 1), 0 <   1, 'lt');
	deepEqual(algo.ge(0, 1), 0 >=  1, 'ge');
	deepEqual(algo.gt(0, 1), 0 >   1, 'gt');
	deepEqual(algo.eq(0, 1), 0 === 1, 'eq');
	deepEqual(algo.ne(0, 1), 0 !== 1, 'ne');

	deepEqual(algo.le(0, 0), 0 <=  0, 'le');
	deepEqual(algo.lt(0, 0), 0 <   0, 'lt');
	deepEqual(algo.ge(0, 0), 0 >=  0, 'ge');
	deepEqual(algo.gt(0, 0), 0 >   0, 'gt');
	deepEqual(algo.eq(0, 0), 0 === 0, 'eq');
	deepEqual(algo.ne(0, 0), 0 !== 0, 'ne');




});