
var util = require('util');
var fmt = util.format;


var check = function(input){
	var title = fmt('string.lempelziv : %s', input);

	test('string.lempelziv', function(assert){

		var Trie = algo.simpletrie_t(256, function(key, i){ return key.charCodeAt(i); });


		var lempelziv = algo.lempelziv_t(Trie, '\0');

		var encoded = [];

		lempelziv.encode(input, encoded);

		var decoded = lempelziv.decode(encoded);


		deepEqual(decoded, input, 'decoded message must be the same as input');

	});
};


var INP = [
	algo.strmul('GZYAGZUAYZGUAYZFAAFAFTAZFTAFZTAFTZFATFA', 4),
	algo.strmul('B', 81),
	''
];

INP.forEach(check);