

var merge_t = function(index, copy){

	var merge = function(a, i, j, b, k, l, c, m){

		var o = m - i - k;
		var t = i;

		for(; k < l; ++k){
			var q = index(b[k], a, i, j);
			i = q[0] + q[1];
			copy(a, t, i, c, o + t + k);
			c[o + i + k] = b[k];
			t = i;
		}

		copy(a, t, j, c, o + t + k);
	};

	return merge;

};

exports.merge_t = merge_t;