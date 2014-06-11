

/**
 * Merges 2 arrays using the Hwang Lin algorithm.
 *
 *   /!\ j - i >= l - k 
 */

var binarymerge_t = function(diff, binarysearch_t, copy){

	var binarysearch = binarysearch_t(diff);

	var hwanglin = function(a, i, j, b, k, l, c, m){

		var o = m - i - k;
		var t = i, q, d, z;

		var x = Math.pow(2, Math.floor(Math.log((j-i)/(l-k))));
		var y = Math.floor((j-i) / x) + 1;

			
		while (k < l && (i + x < j || (x = j - i))) {
			t = i;
			i = t + x;
			while (k < l) {
				if (diff(b[k], a[i]) >= 0) {
					copy(a, t, i, c, o + t + k);
					break;
				}
				q = binarysearch(b[k], a, t, i);
				z = q[0] + q[1];
				copy(a, t, z, c, o + t + k);
				c[o + z + k] = b[k];
				t = z;
				++k;
			}
		}

		copy(a, t, j, c, o + t + k);
		copy(b, k, l, c, o + j + k);

	};

	return hwanglin;

};

exports.binarymerge_t = binarymerge_t;