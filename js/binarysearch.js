

var binarysearch_t = function(comp, equa){

	var binarysearch = function(k, a, i, j){
		if (i === j) return {f:0, w:i};
		var pivot = Math.floor((i + j) / 2);
		if      (equa(k, a[pivot])) return {f:1, w:pivot};
		else if (comp(k, a[pivot])) return binarysearch(k, a, i, pivot);
		else                        return binarysearch(k, a, pivot + 1, j);
	};

	return binarysearch;

};