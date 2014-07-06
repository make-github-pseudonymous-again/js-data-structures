

/**
 * Simple lempelziv data compression algorithm implementation.
 */

var lempelziv_t = function(Trie, end){

	var lempelziv = {};

	lempelziv.encode = function(input, index, suffix){
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

			index.push(pt.value());
			suffix.push(input[i]);

			pt = e;
		}

		index.push(pt.value());
		suffix.push(end);
	};

	lempelziv.decode = function(index, suffix){
		var table = [[0, 0]], output = '';
		var i = 0, len = index.length, j, c, k, l, w;

		for (; i < len; ++i) {
			j = index[i];
			c = suffix[i];
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