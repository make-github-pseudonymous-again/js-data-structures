

var merge_t = function(search, copy){

	var merge = function(a, i, j, b, k, l, c, m, n){

		var i0 = i;
		var k0 = k;
		var t = i;

		for(; k < l; ++k){
			var s = search(a, i, j, b[k]);
			i = s.m + s.f;
			copy(a, t, i, c, m + t - i0 + k - k0, m + i - i0 + k - k0);
			c[m + i - i0 + k - k0] = b[k];
			t = i;
		}

		copy(a, t, j, c, m + t - i0 + k - k0, n);
	};

	return merge;

};