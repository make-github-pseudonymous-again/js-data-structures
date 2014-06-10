test('string', function(assert){
	var c = '7';
	var n = 10;
	var mul = algo.strmul;

	var lfill = algo.lfill_t(c, n, mul);
	var rfill = algo.rfill_t(c, n, mul);

	deepEqual(lfill('jjj'), '7777777jjj', 'lfill');
	deepEqual(rfill('jjj'), 'jjj7777777', 'rfill');
});