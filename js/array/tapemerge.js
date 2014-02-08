

var tapemerge_t = function(compare){

	var tapemerge = function(a, i, j, b, k, l, c, m, n){

		for(; m < n; ++m){
			if(k >= l || (i < j && compare(a[i], b[k]))){
				c[m] = a[i]; ++i;
			}
			else{
				c[m] = b[k]; ++k;
			}
		}
		
	};

	return tapemerge;

};