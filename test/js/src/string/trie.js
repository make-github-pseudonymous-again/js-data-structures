test('string.simpletrie_t', function(assert){

	var map = {
		'test' : null,
		'test-1' : function(){},
		'test-2' : {},
		'test-3' : [],
		'' : 42,
		'è!éèçé!èç!"§éç§É!"!É"' : 'feed-the-test',
	};
	
	var Trie = algo.simpletrie_t(256, function(key, i){ return key.charCodeAt(i); });

	var t = new Trie(), key, e = t.empty(), i, len, pt;

	for (key in map) t.put(key, map[key]);

	for (key in map) {

		pt = e, i = 0, len = key.length;

		for (; i < len; ++i) pt = pt.get(key, i);

		deepEqual(pt.value(), map[key], 'value should be stored in trie');

	}


	var parse = function(){

		var actual = {};

		for (key in map) {

			pt = e, i = 0, len = key.length;

			if (pt.value() !== undefined) actual[key.slice(0, i)] = pt.value();

			for (; i < len; ++i) {
				pt = pt.get(key, i);
				if (pt.value() !== undefined) actual[key.slice(0, i + 1)] = pt.value();
			}

		}

		return actual;
	};

	deepEqual(parse(), map, 'check global structure');


	var ext = {
		'huh' : 'zigzig'
	}, el, toadd = {}, last;

	for (el in ext) {
		for (key in map) {
			toadd[key + el] = ext[el];
			i = 0, last = el.length - 1;
			pt = t.get(key);
			for (; i < last; ++i) pt = pt.set(el, i);
			pt.set(el, last, ext[el]);
		}
	}

	for (key in toadd) map[key] = toadd[key];

	deepEqual(parse(), map, 'check global structure after ext.');


});