

var mergesort_t = function(merge){

	var mergesort = function(a, i, j, d, l, r){
		if(j - i < 2) return;

		var p = Math.floor((i + j) / 2);
		mergesort(a, i, p, d, l, l + p - i);
		mergesort(a, p, j, d, l + p - i, r);
		merge(a, i, p, a, p, j, d, l);
		for(var t = 0; t < j - i; ++t) a[i + t] = d[l + t];
	};

	return mergesort;

};

exports.mergesort_t = mergesort_t;