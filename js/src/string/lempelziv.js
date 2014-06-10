

/**
 * Simple lempelziv data compression algorithm implementation.
 */

var lempelziv_t = function(Trie, end){

	var lempelziv = {};

	lempelziv.encode = function(input, output){
		var j = 0;
		var tree = new Trie(), e = tree.empty(), pt = e, tmp;
		var i = 0, len = input.length;

		tree.put('', 0);

		for (; i < len; ++i) {

			for (; i < len; ++i) {
				tmp = pt.get(input, i);
				if (tmp === undefined) break;
				else pt = tmp;
			}

			if (i === len) break;

			pt.set(input, i, ++j);

			output.push([pt.value(), input[i]]);

			pt = e;
		}

		output.push([pt.value(), end]);
	};

	lempelziv.decode = function(input){
		var table = [[0, 0]], output = '';
		var i = 0, len = input.length, el, j, c, k, l, w;

		for (; i < len; ++i) {
			el = input[i];
			j = el[0];
			c = el[1];
			k = table[j][0];
			l = table[j][1];
			w = output.length;

			output += output.slice(k, l);

			if (c !== end) {
				table.push([w, w + l - k + 1]);
				output += c;
			}
		}

		return output;

	};

	return lempelziv;
};


exports.lempelziv_t = lempelziv_t;