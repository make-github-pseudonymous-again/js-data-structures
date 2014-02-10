

var mergesort_t = function(merge){

	var mergesort = function(a, i, j, c, m, n){
		if(j - i >= 2){
			var cut = Math.floor((i + j) / 2);
			mergesort(a, i, cut, c, m, m + cut - i);
			mergesort(a, cut, j, c, m + cut - i, n);
			merge(a, i, cut, a, cut, j, c, m, n);
			for(var t = 0; t < j - i; ++t) a[i + t] = c[m + t];
		}
	};

	return mergesort;

};